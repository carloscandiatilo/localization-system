import { Controller, Get, Delete, Param, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { BaseController } from './base.controller';
import { Module } from 'src/core/modules/entity/module.entity';
import { ModuleService } from 'src/core/modules/service/module.service';

@Controller('modules')
@UsePipes(new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
}))
export class ModuleController extends BaseController<Module> {
  constructor(private readonly moduleService: ModuleService) {
    super(moduleService);
  }

  @Get('with-submodules')
  async loadAllModulesWithSubmodules() {
    return await this.moduleService.loadAllModules();
  }

  @Get(':id')
  async loadModuloById(@Param('id') id: number) {
    const modulo = await this.moduleService.loadModuloById(id);
    if (!modulo) throw new NotFoundException('Módulo não encontrado');
    return modulo;
  }

  @Delete(':id/permanente')
  async removeModulePermanently(@Param('id') id: number) {
    await this.moduleService.removeModulePermanently(id);
    return { mensagem: 'Módulo removido permanentemente com sucesso' };
  }
}
