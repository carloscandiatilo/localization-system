import { Module } from '@nestjs/common';

import { CategoriaRepository } from './repository/categoria.repository';
import { CategoriaService } from './service/categoria.service';
import { CategoriaController } from 'src/controller/categoria.controller';

@Module({
  controllers: [CategoriaController],
  providers: [CategoriaService, CategoriaRepository],
})
export class CategoriaModule {}
