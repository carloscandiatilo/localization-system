import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { ModuleRepository } from '../repository/module.repository';
import { Module } from '../entity/module.entity';
import { BaseService } from 'src/core/base/service/base.service';
import { DataSource, IsNull } from 'typeorm';
import { AuditService } from 'src/core/audit/service/audit.service';

@Injectable()
export class ModuleService extends BaseService<Module> {
  constructor(
    private readonly moduleRepository: ModuleRepository,
    protected readonly auditService: AuditService,
    protected readonly dataSource: DataSource  
  ) {
    super(moduleRepository,auditService, dataSource);
  }
  
  async loadAllModules(): Promise<Module[]> {
    const mainModules = await this.moduleRepository.find({
      where: { isDeleted: false, mainModule: IsNull() },
      relations: this.generateNestedRelations('submodules')
    });
    return this.removeParentField(mainModules);
  }

  async loadModuloById(moduleId: number): Promise<Module | null> {
    const module = await this.moduleRepository.findOne({
      where: { id: moduleId, isDeleted: false },
      relations: this.generateNestedRelations('submodules')
    });
    return module ? this.removeParentField([module])[0] : null;
  }

   async createModule(name: string, description: string, aggregateModule?: number): Promise<Module> {
    await this.verifyDuplicate(name, aggregateModule);

    const moduleParent = aggregateModule ? await this.moduleRepository.findOne({ where: { id: aggregateModule } }): null;

    if (aggregateModule && !moduleParent) {
      throw new NotFoundException('Módulo Principal não encontrado.');
    }

    const newModule = this.moduleRepository.create({
      name,
      description,
      mainModule: moduleParent
    });

    return await this.moduleRepository.save(newModule);
  }

  async updateModule(moduleId: number, updatedData: Partial<Module>): Promise<Module | null> {
    if (updatedData.name) {
      const atualModule = await this.moduleRepository.findOne({ where: { id: moduleId } });
      if (!atualModule) {
        throw new NotFoundException('Módulo não encontrado.');
      }
      await this.verifyDuplicate(updatedData.name, atualModule.mainModule?.id);
    }

    await this.moduleRepository.update(moduleId, updatedData);
    return await this.loadModuloById(moduleId);
  }

   async removeModuleInLogicalWay(moduleId: number): Promise<void> {
    await this.updateModule(moduleId, { isDeleted: true });
  }

  async removeModulePermanently(moduleId: number): Promise<void> {
    const module = await this.loadModuloById(moduleId);
    if (!module) {
        throw new NotFoundException('Módulo não encontrado');
    }

    if (module.submodules && module.submodules.length > 0) {
        throw new BadRequestException('Não é possível eliminar o módulo pois possui submódulos ativos');
    }
    await this.moduleRepository.delete(moduleId);
}

  private generateNestedRelations(relation: string, depthLevel: number = 10): string[] {
    const nestedRelations: string[] = [];
    let actualRelation = relation;

    for (let nivel = 0; nivel < depthLevel; nivel++) {
      nestedRelations.push(actualRelation);
      actualRelation += '.submodules';
    }

    return nestedRelations;
  }

  private removeParentField(modules: Module[]): Module[] {
    return modules.map(({ mainModule, submodules = [], ...datesModule }) => ({
      ...datesModule,
      submodules: submodules.length > 0 ? this.removeParentField(submodules) : []
    }));
  }

  private async verifyDuplicate(name: string, aggregateModule?: number): Promise<void> {
    const condition = aggregateModule ? { name, mainModule: { id: aggregateModule }, isDeleted: false } : { name, mainModule: IsNull(), isDeleted: false };
    const existingModule = await this.moduleRepository.findOne({ where: condition });

    if (existingModule) {
      throw new ConflictException('Já existe um módulo com esse name no mesmo nível.');
    }
  }
}
