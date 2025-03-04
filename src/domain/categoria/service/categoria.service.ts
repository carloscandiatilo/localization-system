import { CategoriaRepository } from '../repository/categoria.repository';
import { Categoria } from '../entity/categoria.entity';
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base/service/base.service'; 

@Injectable()
export class CategoriaService extends BaseService<Categoria> {
  constructor(private readonly categoriaRepository: CategoriaRepository) {
    super(categoriaRepository);
  }

  async getAllCategorias(): Promise<Categoria[] | string> {
    const categorias = await this.categoriaRepository.findAll();
    if (categorias.length === 0) {
      return 'Nenhuma categoria encontrada.';
    }
    return categorias;
  }

  async getCategoriaById(id: number): Promise<Categoria | string> {
    const categoria = await this.categoriaRepository.findById(id);
    if (!categoria) {
      return `Categoria com ID ${id} não encontrada.`;
    }
    return categoria;
  }

  async createCategoria(data: Partial<Categoria>): Promise<Categoria | string> {
    return this.categoriaRepository.createEntity(data);
  }

  async updateCategoria(id: number, data: Partial<Categoria>): Promise<Categoria | string> {
    return await this.update(id, data); 
  }

  async softDeleteCategoria(id: number): Promise<string> {
    return await this.softDelete(id);
  }


  async getCategoriaByName(nome: string): Promise<Categoria | string> {
    const categoria = await this.categoriaRepository.findByName(nome);
    if (!categoria) {
      return `Categoria com o nome ${nome} não encontrada.`;
    }
    return categoria;
  }
}
