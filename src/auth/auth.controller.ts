import { Body, Controller, Get, Post, Request, Res } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { AuthDto } from './dto/auth.dto';
import { Auth } from 'src/common/decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Аутентификация пользователя' })
  @ApiBody({
    description: 'Данные для аутентификации пользователя',
    type: AuthDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Успешная аутентификация',
  })
  @ApiResponse({ status: 400, description: 'Неверные данные' })
  async login(@Body() dto: AuthDto, @Res({ passthrough: true }) res: Response) {
    const { refreshToken, ...response } = await this.authService.login(dto);
    return response;
  }

  @Auth()
  @Get('check')
  async checkAuth(@Request() req) {
    const employee = req.user;
    return await this.authService.checkAuth(employee.id);
  }
}
