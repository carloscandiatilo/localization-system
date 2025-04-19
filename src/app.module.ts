import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from './config/typeorm.config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ModuleModule } from './core/modules/module.module';
import { RoleModule } from './core/roles/role.module';
import { PermissionModule } from './core/permissions/permission.module';
import { UserModule } from './core/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    UserModule,
    ModuleModule,
    RoleModule,
    PermissionModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
