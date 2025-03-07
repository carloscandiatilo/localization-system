import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './core/auth/user/user.module';
import typeormConfig from './config/typeorm.config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { CategoriaModule } from './domain/categoria/categoria.module';
import { ClienteModule } from './domain/cliente/cliente.module';
import { ModuleModule } from './domain/module/module.module';
import { RoleModule } from './domain/role/role.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    UserModule,
    CategoriaModule,
    ClienteModule,
    ModuleModule,
    RoleModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
