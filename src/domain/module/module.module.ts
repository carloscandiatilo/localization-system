import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module as ModuleEntity } from './entity/module.entity';
import { ModuleService } from './service/module.service';
import { ModuleRepository } from './repository/module.repository';
import { ModuleController } from 'src/controller/module.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ModuleEntity])],
  providers: [ModuleService, ModuleRepository],
  controllers: [ModuleController],
  exports: [ModuleService, ModuleRepository],
})
export class ModuleModule {}
