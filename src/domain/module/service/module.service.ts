import { Injectable } from '@nestjs/common';
import { ModuleRepository } from '../repository/module.repository';
import { Module } from '../entity/module.entity';
import { BaseService } from 'src/core/base/service/base.service';

@Injectable()
export class ModuleService extends BaseService<Module>{

  constructor(private readonly moduleRepository: ModuleRepository) {
    super(moduleRepository); 
  }

  async createModule(nome: string, descricao: string): Promise<Module> {
    const module = this.moduleRepository.create({ nome, descricao });
    return await this.moduleRepository.save(module);
  }

  async getAllModules(): Promise<Module[]> {
    return this.moduleRepository.findAll();
  }
}


