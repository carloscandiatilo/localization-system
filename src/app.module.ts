import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './core/auth/user/user.module';
import typeormConfig from './config/typeorm.config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ModuleModule } from './domain/module/module.module';
import { RoleModule } from './domain/role/role.module';
import { CriancaModule } from './domain/crianca/crianca.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    UserModule,
    ModuleModule,
    RoleModule,
    CriancaModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
