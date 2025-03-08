import { Injectable, BadRequestException } from '@nestjs/common';
import { CategoriaRepository } from '../repository/categoria.repository';
import { Categoria } from '../entity/categoria.entity';
import { BaseService } from 'src/core/base/service/base.service';
import { DataSource } from 'typeorm';

@Injectable()
export class CategoriaService extends BaseService<Categoria> {
  constructor(
    protected readonly categoriaRepository: CategoriaRepository,
    protected readonly dataSource: DataSource 
  ) {
    super(categoriaRepository, dataSource); 
  }

  async getCategoriaWithUser(categoriaId: number): Promise<Categoria | null> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id: categoriaId, isDeleted: false },
      relations: ['user'],
    });

    if (!categoria) {
      const categoriaInfo = await this.categoriaRepository.findOne({
        where: { id: categoriaId },
        select: ['nome']
      });
      const nome = categoriaInfo?.nome ? `'${categoriaInfo.nome}'` : `ID ${categoriaId}`;
      throw new BadRequestException(`Categoria com ${nome} não encontrada.`);
    }
    return categoria;
}


  async getCategoriaByName(nome: string): Promise<Categoria | null> {
    const categoria = await this.categoriaRepository.findByName(nome);

    if (!categoria) {
      throw new BadRequestException(`Categoria com nome '${nome}' não encontrada.`);
    }

    return categoria;
  }  
}
