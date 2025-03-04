import { Controller } from '@nestjs/common';
import { CategoriaService } from 'src/domain/categoria/service/categoria.service';
import { BaseController } from './base.controller';
import { Categoria } from 'src/domain/categoria/entity/categoria.entity';

@Controller('categorias')
export class CategoriaController extends BaseController<Categoria> {
  constructor(private readonly categoriaService: CategoriaService) {
    super(categoriaService);
  }
}
