import { Controller, Get, Post, Body, HttpException, HttpStatus, UseGuards, Request, Patch, Param } from '@nestjs/common';
import { AuthService } from 'src/core/auth/service/auth.service';
import { UserService } from '../service/user.service';
import { AuthGuard } from '@nestjs/passport';
import { ValidationMessages } from 'src/shared/messages/validation-messages';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SignupDto } from 'src/core/auth/dto/signup.dto';
import { LoginDto } from 'src/core/auth/dto/login.dto';
import { UpdateUserDto } from 'src/core/auth/dto/update-user.dto';

@ApiTags('Usuários')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'Registrar um novo usuário' })
  @ApiResponse({ status: 201, description: 'Usuário cadastrado com sucesso' })
  @ApiResponse({ status: 400, description: 'Email já existe' })
  async signup(
    // @Body() body: { name: string; username: string; password: string; email: string }
    @Body() body: SignupDto
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
      role: user?.role?.name || 'Sem perfil.',
    };
  }

  @Post('login')
  @ApiOperation({ summary: 'Autenticar usuário e gerar token JWT' })
  @ApiResponse({ status: 200, description: ValidationMessages.LOGIN_SUCCESS })
  @ApiResponse({ status: 401, description: ValidationMessages.INVALID_CREDENTIAL })
  async login(@Body() body: LoginDto) {

    if (!body || !body.username || !body.password) {
      throw new HttpException(
        ValidationMessages.INVALID_DATE,
        HttpStatus.BAD_REQUEST,
      );
    }

    const user = await this.userService.validateUser(body.username, body.password);
    if (!user) {
      throw new HttpException(
        ValidationMessages.INVALID_CREDENTIAL,
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (!user.role) {
      throw new HttpException(ValidationMessages.PROFILE_UPDATE_REQUIRED, HttpStatus.FORBIDDEN);
    }

    const token = await this.authService.generateToken(user);
    return { access_token: token };
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Atualizar informações do usuário' })
  async updateUser(
    @Param('id') id: number,
    @Body() body: UpdateUserDto,
    @Request() req,
  ) {
    const userId = req.user.userId;

    if (userId !== Number(id)) {
      throw new HttpException(ValidationMessages.CANNOT_CHANGE_PROFILE, HttpStatus.FORBIDDEN);
    }

    const updatedUser = await this.userService.updateUser(id, body);

    return {
      message: ValidationMessages.USER_CHANGED_SUCCESSFULLY,
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role?.name || 'Sem perfil',
    };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obter informações do usuário autenticado' })
  getProfile(@Request() req) {
    return req.user;
  }
}
