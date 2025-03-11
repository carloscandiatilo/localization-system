import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './core/auth/user/user.module';
import typeormConfig from './config/typeorm.config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ModuleModule } from './domain/module/module.module';
import { RoleModule } from './domain/role/role.module';
import { ProvinciaModule } from './domain/localizacao/provincia/provincia.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    UserModule,
    ModuleModule,
    RoleModule,
    ProvinciaModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
