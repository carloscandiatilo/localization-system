import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Module } from '../entity/module.entity';
import { BaseRepository } from 'src/core/base/repository/base.repository';

@Injectable()
export class ModuleRepository extends BaseRepository<Module> {
  constructor(dataSource: DataSource) {
    super(Module, dataSource);
  }

  async findAllWithSubmodules(): Promise<Module[]> {
    return this.find({
      where: { isDeleted: false },
      relations: ['submodulos'],
    });
  }
  
}


