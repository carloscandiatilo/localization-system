import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from 'src/core/auth/auth.service';
import { UserService } from './service/user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signup(@Body() body: { username: string; password: string; email: string }) {
    try {
      const existingUserByEmail = await this.userService.findByEmail(body.email);
      if (existingUserByEmail) {
        throw new HttpException('Esse e-mail já existe no sistema', HttpStatus.BAD_REQUEST);
      }
      const user = await this.userService.createUser(body.username, body.password, body.email);
      
      return {
        id: user.id,
        username: user.username,
      };
    } catch (error) {
      throw new HttpException(
        error.response || 'Erro ao criar usuário', 
        error.status || HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.userService.validateUser(body.username, body.password);
    if (!user) {
      throw new HttpException('Credencial errada', HttpStatus.UNAUTHORIZED);
    }

    const token = await this.authService.generateToken(user);
    return { access_token: token };
  }

  @Get()
  async getAllUsers() {
    return this.userService.getAllUsers();
  }
}
