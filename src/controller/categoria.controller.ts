import { Controller, Get, Param } from '@nestjs/common';
import { CategoriaService } from 'src/domain/categoria/service/categoria.service';
import { Categoria } from 'src/domain/categoria/entity/categoria.entity';

@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  async getAllCategorias(): Promise<Categoria[] | string> {
    return this.categoriaService.getAllCategorias();
  }
  
  @Get(':id')
  async getCategoriaWithUser(@Param('id') id: number): Promise<Categoria | null> {
    return this.categoriaService.getCategoriaWithUser(id);
  }
}
