import {
  Body,
  Inject,
  NotFoundException,
  Param,
  UploadedFile,
} from '@nestjs/common';
import { CurrentUser } from 'src/common/decorator';
import { ProfileService } from 'src/profile/application';
import {
  ChangePasswordDTO,
  ConfirmPasswordDTO,
  UpdateProfileDTO,
  RegisterProfileDto,
} from './dto/profile';
import {
  RegisterEmployeeDecorator,
  Profile,
  GetProfileByIdDecorator,
  GetAllProfilesDecorator,
  UpdateProfileDecorator,
  ConfirmPasswordDecorator,
  ChangePasswordDecorator,
  ForgotPasswordDecorator,
  VerifyTokenDecorator,
  UploadProfileAvatarDecorator,
  Blank,
} from './decorator/profile';
import { ProfileExistencePipe } from './pipe';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';

@Profile()
export class ProfileResource {
  constructor(
    private profileService: ProfileService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  @RegisterEmployeeDecorator()
  async registerNewProfile(
    @Blank()
    registerProfileDto: RegisterProfileDto,
  ) {
    const employee = await this.profileService.register(registerProfileDto);
    return employee;
  }

  @GetProfileByIdDecorator()
  async getProfileById(@Param('id', ProfileExistencePipe) employee) {
    return await this.profileService.getEmployeeById(employee.id);
  }

  @GetAllProfilesDecorator()
  async getAllProfiles() {
    return this.profileService.getAllProfiles();
  }

  @ChangePasswordDecorator()
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDTO,
    @CurrentUser('id') id: string,
  ) {
    return await this.profileService.changePassword(id, changePasswordDto);
  }

  @UpdateProfileDecorator()
  async updateProfile(
    @Param('id') id: string,
    @Body()
    updateEmployeeDto: UpdateProfileDTO,
  ) {
    return this.profileService.updateProfile(id, updateEmployeeDto);
  }

  @ConfirmPasswordDecorator()
  async confirmPassword(
    @Param('confirmation_token') confirmation_token: string,
    @Body() { password }: ConfirmPasswordDTO,
  ) {
    const exists = await this.cacheManager.get(`confirmation_token`);
    if (!exists) {
      throw new NotFoundException('Ссылка не действительна');
    }
    const profile = await this.profileService.confirmPassword(
      confirmation_token,
      password,
    );
    await this.cacheManager.del(`confirmation_token`);
    return profile;
  }

  @VerifyTokenDecorator()
  async verify(@Param('confirmation_token') confirmation_token: string) {
    const link = await this.cacheManager.get('confirmation_token');
    if (!link) {
      throw new NotFoundException('Ссылка не действительна');
    }
    return;
  }

  @ForgotPasswordDecorator()
  async forgotPassword(@Body('email') email: string) {
    return this.profileService.forgotPassword(email);
  }

  @UploadProfileAvatarDecorator()
  async uploadAvatar(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return await this.profileService.uploadAvatar(id, file);
  }
}
