import { CategoriaRepository } from '../repository/categoria.repository';
import { Categoria } from '../entity/categoria.entity';
import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/core/base/service/base.service'; 

@Injectable()
export class CategoriaService extends BaseService<Categoria> {
  constructor(private readonly categoriaRepository: CategoriaRepository) {
    super(categoriaRepository); // Passando a categoriaRepository para o BaseService
  }

  // Método para pegar todas as categorias
  async getAllCategorias(): Promise<Categoria[] | string> {
    const categorias = await this.categoriaRepository.findAll();
    if (categorias.length === 0) {
      return 'Nenhuma categoria encontrada.';
    }
    return categorias;
  }

  // Método para pegar uma categoria pelo ID
  async getCategoriaById(id: number): Promise<Categoria | string> {
    const categoria = await this.categoriaRepository.findById(id);
    if (!categoria) {
      return `Categoria com ID ${id} não encontrada.`;
    }
    return categoria;
  }

  // Método para criar uma nova categoria
  async createCategoria(data: Partial<Categoria>): Promise<Categoria | string> {
    // Você pode adicionar condições únicas se necessário
    return this.categoriaRepository.createEntity(data);
  }

  // Método para atualizar uma categoria
  async updateCategoria(id: number, data: Partial<Categoria>): Promise<Categoria | string> {
    return await this.update(id, data); // Usando o método update do BaseService
  }

  // Método para deletar logicamente uma categoria
  async softDeleteCategoria(id: number): Promise<string> {
    return await this.softDelete(id); // Usando o método softDelete do BaseService
  }


  // Método para buscar categoria por nome
  async getCategoriaByName(nome: string): Promise<Categoria | string> {
    const categoria = await this.categoriaRepository.findByName(nome);
    if (!categoria) {
      return `Categoria com o nome ${nome} não encontrada.`;
    }
    return categoria;
  }
}
