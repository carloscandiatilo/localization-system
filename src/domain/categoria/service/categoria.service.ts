import { Injectable } from '@nestjs/common';
import { CategoriaRepository } from '../repository/categoria.repository';
import { Categoria } from '../entity/categoria.entity';
import { BaseService } from 'src/core/base/service/base.service';

@Injectable()
export class CategoriaService extends BaseService<Categoria> {
  constructor(private readonly categoriaRepository: CategoriaRepository) {
    super(categoriaRepository); 
  }

  async getCategoriaWithUser(categoriaId: number): Promise<Categoria | null> {
    return await this.categoriaRepository.findOne({
      where: { id: categoriaId },
      relations: ['user'],
    });
  }

  async getCategoriaByName(nome: string): Promise<Categoria | null> {
    return await this.categoriaRepository.findByName(nome);
  }

  async softDeleteCategoria(id: number): Promise<string> {
    return await this.softDelete(id);
  }
  
}
