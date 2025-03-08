import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { ModuleRepository } from '../repository/module.repository';
import { Module } from '../entity/module.entity';
import { BaseService } from 'src/core/base/service/base.service';
import { DataSource, IsNull } from 'typeorm';

@Injectable()
export class ModuleService extends BaseService<Module> {
  constructor(
    private readonly moduloRepositorio: ModuleRepository,
    protected readonly dataSource: DataSource  
  ) {
    super(moduloRepositorio, dataSource);
  }
  
  async carregarTodosModulos(): Promise<Module[]> {
    const modulosPrincipais = await this.moduloRepositorio.find({
      where: { isDeleted: false, pai: IsNull() },
      relations: this.construirRelacoesAninhadas('submodulos')
    });
    return this.removerCampoPai(modulosPrincipais);
  }

  async carregarModuloPorId(moduloId: number): Promise<Module | null> {
    const modulo = await this.moduloRepositorio.findOne({
      where: { id: moduloId, isDeleted: false },
      relations: this.construirRelacoesAninhadas('submodulos')
    });
    return modulo ? this.removerCampoPai([modulo])[0] : null;
  }

   async criarModulo(nome: string, descricao: string, paiId?: number): Promise<Module> {
    await this.verificarDuplicidade(nome, paiId);

    const moduloParente = paiId ? await this.moduloRepositorio.findOne({ where: { id: paiId } }): null;

    if (paiId && !moduloParente) {
      throw new NotFoundException('Módulo pai não encontrado.');
    }

    const novoModulo = this.moduloRepositorio.create({
      nome,
      descricao,
      pai: moduloParente
    });

    return await this.moduloRepositorio.save(novoModulo);
  }

  async actualizarModulo(moduloId: number, dadosAtualizados: Partial<Module>): Promise<Module | null> {
    if (dadosAtualizados.nome) {
      const moduloAtual = await this.moduloRepositorio.findOne({ where: { id: moduloId } });
      if (!moduloAtual) {
        throw new NotFoundException('Módulo não encontrado.');
      }
      await this.verificarDuplicidade(dadosAtualizados.nome, moduloAtual.pai?.id);
    }

    await this.moduloRepositorio.update(moduloId, dadosAtualizados);
    return await this.carregarModuloPorId(moduloId);
  }

   async removerModuloFormaLogica(moduloId: number): Promise<void> {
    await this.actualizarModulo(moduloId, { isDeleted: true });
  }

  async removerModuloFormaPermanente(moduloId: number): Promise<void> {
    const modulo = await this.carregarModuloPorId(moduloId);
    if (!modulo) {
        throw new NotFoundException('Módulo não encontrado');
    }

    if (modulo.submodulos && modulo.submodulos.length > 0) {
        throw new BadRequestException('Não é possível eliminar o módulo pois possui submódulos ativos');
    }
    await this.moduloRepositorio.delete(moduloId);
}

  private construirRelacoesAninhadas(relacao: string, profundidade: number = 10): string[] {
    const relacoesAninhadas: string[] = [];
    let relacaoAtual = relacao;

    for (let nivel = 0; nivel < profundidade; nivel++) {
      relacoesAninhadas.push(relacaoAtual);
      relacaoAtual += '.submodulos';
    }

    return relacoesAninhadas;
  }

  private removerCampoPai(modulos: Module[]): Module[] {
    return modulos.map(({ pai, submodulos = [], ...dadosModulo }) => ({
      ...dadosModulo,
      submodulos: submodulos.length > 0 ? this.removerCampoPai(submodulos) : []
    }));
  }

  private async verificarDuplicidade(nome: string, paiId?: number): Promise<void> {
    const condicao = paiId ? { nome, pai: { id: paiId }, isDeleted: false } : { nome, pai: IsNull(), isDeleted: false };
    const moduloExistente = await this.moduloRepositorio.findOne({ where: condicao });

    if (moduloExistente) {
      throw new ConflictException('Já existe um módulo com esse nome no mesmo nível.');
    }
  }
}
