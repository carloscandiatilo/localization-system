import { CategoriaRepository } from '../repository/categoria.repository';
import { Categoria } from '../entity/categoria.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriaService {
  constructor(private readonly categoriaRepository: CategoriaRepository) {}

  async getCategoriaWithUser(categoriaId: number): Promise<Categoria | null> {
    return await this.categoriaRepository.findOne({
      where: { id: categoriaId },
      relations: ['user'],
    });
  }

  async getAllCategorias(): Promise<Categoria[] | string> {
    const categorias = await this.categoriaRepository.findAll();
    return categorias.length === 0 ? 'Nenhuma categoria encontrada.' : categorias;
  }

  async getCategoriaById(id: number): Promise<Categoria | null> {
    return await this.categoriaRepository.findById(id);
  }

  async createCategoria(data: Partial<Categoria>): Promise<Categoria | string> {
    return this.categoriaRepository.createEntity(data);
  }

  async updateCategoria(id: number, data: Partial<Categoria>): Promise<Categoria | string> {
    const categoriaAtualizada = await this.categoriaRepository.updateEntity(id, data);
    if (!categoriaAtualizada) {
      return `Categoria com ID ${id} não encontrada.`;
    }
    return categoriaAtualizada;
  }
  

  async softDeleteCategoria(id: number): Promise<string> {
    const result = await this.categoriaRepository.softDelete(id);
    if (result.affected && result.affected > 0) {
      return `Categoria com ID ${id} deletada logicamente.`;
    }
    return `Categoria com ID ${id} não encontrada para exclusão lógica.`;
  }
  

  async getCategoriaByName(nome: string): Promise<Categoria | null> {
    return await this.categoriaRepository.findByName(nome);
  }
}
