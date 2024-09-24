import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { ProfileRepository } from '../port/persistence/profile.repository';
import { PasswordManagerService } from '../port/adapter/password-manager.service';
import {
  ChangePasswordDTO,
  CreateProfileDTO,
  UpdateProfileDTO,
} from './dto/profile';
import { Email, Fullname } from '../domain/profile/value';
import { Profile } from '../domain/profile/profile';
import { EventBus } from '@nestjs/cqrs';
import { ProfileRegistered } from '../domain/profile/event';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

import { MediaService } from '../port/adapter/media.service';
import { DocumentService } from './document.service';
import { DocumentType } from '../domain/enum';

@Injectable()
export class ProfileService {
  constructor(
    private readonly profileRepo: ProfileRepository,
    private readonly passwords: PasswordManagerService,
    private readonly eventBus: EventBus,
    private readonly mailer: MailerService,
    private jwt: JwtService,
    @Inject(CACHE_MANAGER) private cache: Cache,
    private media: MediaService,
    private readonly document: DocumentService,
  ) {}

  async findByEmail(email: string) {
    return await this.profileRepo.findByEmail(email);
  }

  async getEmployeeById(id: string) {
    const employee = await this.profileRepo.findById(id);
    const avatarUrl = employee.avatar
      ? await this.media.getFileUrl(employee.avatar)
      : null;

    const { password, ...data } = employee;
    return {
      ...data,
      avatarUrl,
    };
  }

  async getAllProfiles() {
    const profiles = await this.profileRepo.findAll();
    const profilesWithAvatars = await Promise.all(
      profiles.map(async (profile) => {
        const avatarUrl = profile.avatar
          ? await this.media.getFileUrl(profile.avatar)
          : null;
        return {
          ...profile,
          avatarUrl,
        };
      }),
    );
    return profilesWithAvatars.map(({ password, ...profile }) => profile);
  }

  async register(createProfileDto: CreateProfileDTO) {
    const { resume, passport, employmentContract } = createProfileDto;
    const id = randomUUID();
    const pass = await this.passwords.generate();
    const hashedPassword = await this.passwords.hash(pass);

    const email = new Email(createProfileDto.email);

    const fullName = new Fullname(
      createProfileDto.firstName,
      createProfileDto.lastName,
    );

    const employee = Profile.Register(
      id,
      email,
      fullName,
      hashedPassword,
      createProfileDto.hiredAt,
    );

    await this.document.addDocument(id, DocumentType.RESUME, resume);

    await this.document.addDocument(
      id,
      DocumentType.EMPLOYMENT_CONTRACT,
      employmentContract,
    );

    await this.document.addDocument(id, DocumentType.PASSPORT, passport);

    const employeeEntity = await this.profileRepo.save(employee);

    this.eventBus.publish(new ProfileRegistered(employee.id, email, fullName));

    return employeeEntity;
  }

  async updateProfile(id: string, updateProfileDto: UpdateProfileDTO) {
    const employee = await this.profileRepo.update(id, updateProfileDto);
    return employee;
  }

  async changePassword(
    id: string,
    { oldPassword, newPassword }: ChangePasswordDTO,
  ) {
    const profile = await this.profileRepo.findById(id);

    const isValid = await this.passwords.verify(profile.password, oldPassword);

    if (!isValid) throw new UnauthorizedException('Старый пароль не верный');

    const hashedPassword = await this.passwords.hash(newPassword);

    profile.password = hashedPassword;

    return await this.profileRepo.changePassword(profile.id, profile.password);
  }

  async sendConfirmationLink(id: string) {
    const profile = await this.profileRepo.findById(id);

    const confirmationToken = this.jwt.sign({ id });
    console.log(confirmationToken);
    await this.mailer.sendMail({
      to: profile.email,
      subject: 'HRM - 360',
      template: 'register',
      context: {
        confirmationToken,
      },
    });

    await this.cache.set(`confirmation_token`, confirmationToken, 120000);
    return;
  }

  async confirmPassword(confirmation_token: string, password: string) {
    const { id } = this.jwt.decode(confirmation_token);

    const hashedPassword = await this.passwords.hash(password);
    const profile = await this.profileRepo.changePassword(id, hashedPassword);
    return profile;
  }

  async forgotPassword(email: string) {
    const profile = await this.profileRepo.findByEmail(email);
    await this.sendConfirmationLink(profile.id);
    return true;
  }

  async uploadAvatar(id: string, file: Express.Multer.File) {
    const profile = await this.profileRepo.findById(id);

    const fileName = await this.media.uploadFile(file);

    const avatarUrl = await this.media.getFileUrl(fileName);

    await this.profileRepo.update(id, { avatar: fileName });

    return avatarUrl;
  }
}
