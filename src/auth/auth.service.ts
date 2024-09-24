import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDto } from './dto/auth.dto';
import { verify } from 'argon2';
import { ProfileRepository } from 'src/profile/port/persistence/profile.repository';
import { MediaService } from 'src/profile/port/adapter/media.service';

@Injectable()
export class AuthService {
  constructor(
    private profileRepo: ProfileRepository,
    private jwt: JwtService,
    private media: MediaService,
  ) {}

  async login(authDto: AuthDto) {
    const { password, ...employee } = await this.validateEmployee(authDto);

    const avatarUrl = employee.avatar
      ? await this.media.getFileUrl(employee.avatar)
      : null;

    const token = this.issueTokens(employee.id);

    return {
      employee: {
        ...employee,
        avatarUrl,
      },
      ...token,
    };
  }

  async checkAuth(id: string) {
    const employee = await this.profileRepo.findById(id);
    const avatarUrl = employee.avatar
      ? await this.media.getFileUrl(employee.avatar)
      : null;
    return {
      ...employee,
      avatarUrl,
    };
  }

  private issueTokens(id: string) {
    const data = { id };

    const accessToken = this.jwt.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwt.sign(data, {
      expiresIn: '7d',
    });
    return { accessToken, refreshToken };
  }

  private async validateEmployee(authDto: AuthDto) {
    const employee = await this.profileRepo.findByEmail(authDto.email);

    if (!employee) throw new NotFoundException('Профиль не найден');

    const isValid = await verify(employee.password, authDto.password);
    if (!isValid) throw new UnauthorizedException('Неверный пароль или логин');

    return employee;
  }
}
