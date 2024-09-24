import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guard/auth.guard';

export const Auth = () => UseGuards(JwtAuthGuard);
