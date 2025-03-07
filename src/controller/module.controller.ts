import { Controller } from '@nestjs/common';
import { BaseController } from './base.controller';
import { Module } from 'src/domain/module/entity/module.entity';
import { ModuleService } from 'src/domain/module/service/module.service';

@Controller('modules')
export class ModuleController extends BaseController<Module> {
  constructor(private readonly moduleService: ModuleService) {
    super(moduleService);
  }
}
