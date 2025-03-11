import { Controller, Get, Post, Body, HttpException, HttpStatus, UseGuards, Request, Patch, Param } from '@nestjs/common';
import { AuthService } from 'src/core/auth/service/auth.service';
import { UserService } from '../service/user.service';
import { AuthGuard } from '@nestjs/passport';
import { ValidationMessages } from 'src/shared/messages/validation-messages';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signup(
    @Body() body: { name: string; username: string; password: string; email: string }
  ) {
    const existingUserByEmail = await this.userService.findByEmail(body.email);
    if (existingUserByEmail) {
      throw new HttpException(
        ValidationMessages.EMAIL_ALREADY_EXISTS,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.createUser({
      name: body.name,
      username: body.username,
      password: body.password,
      email: body.email,
      roleId: null,
    });

    return {
      message: ValidationMessages.SIGNUP_SUCCESS,
      id: user.id,
      username: user.username,
      role: user?.role?.nome || 'Sem perfil.',
    };
  }

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.userService.validateUser(
      body.username,
      body.password,
    );
    if (!user) {
      throw new HttpException(ValidationMessages.CREDENTIALS_INVALID, HttpStatus.UNAUTHORIZED);
    }
    if (!user.role) {
      throw new HttpException(
        ValidationMessages.PROFILE_UPDATE_REQUIRED,
        HttpStatus.FORBIDDEN,
      );
    }

    const token = await this.authService.generateToken(user);
    return { access_token: token };
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateUser(
    @Param('id') id: number,
    @Body()
    body: {
      username?: string;
      email?: string;
      password?: string;
      roleId?: number;
    },
  ) {
    const updatedUser = await this.userService.updateUser(id, body);

    return {
      message: ValidationMessages.SIGNUP_SUCCESS,
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role?.nome || 'Sem perfil',
    };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  getProfile(@Request() req) {
    return req.user;
  }
}
