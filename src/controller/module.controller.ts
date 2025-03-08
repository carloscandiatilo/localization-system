import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UsePipes, ValidationPipe } from '@nestjs/common';
import { BaseController } from './base.controller';
import { Module } from 'src/domain/module/entity/module.entity';
import { ModuleService } from 'src/domain/module/service/module.service';
import { CreateModuleDto } from 'src/domain/module/dto/create-module.dto';
import { UpdateModuleDto } from 'src/domain/module/dto/update-module.dto';

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
  async carregarModulosComSubmodulos() {
    return await this.moduleService.carregarTodosModulos();
  }

  @Get(':id')
  async carregarModuloPorId(@Param('id') id: number) {
    const modulo = await this.moduleService.carregarModuloPorId(id);
    if (!modulo) throw new NotFoundException('Módulo não encontrado');
    return modulo;
  }

  @Delete(':id/permanente')
  async removerModuloFormaPermanente(@Param('id') id: number) {
    await this.moduleService.removerModuloFormaPermanente(id);
    return { mensagem: 'Módulo removido permanentemente com sucesso' };
  }
}
