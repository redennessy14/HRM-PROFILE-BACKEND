import { JwtModuleOptions } from '@nestjs/jwt';
import { ConfigService } from 'src/app/config';

export const getJwtConfig = async (
  configService: ConfigService,
): Promise<JwtModuleOptions> => ({
  secret: configService.jwtSecret,
});
