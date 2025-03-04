import { Module } from '@nestjs/common';
import { CategoriaService } from './service/categoria.service';
import { CategoriaRepository } from './repository/categoria.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entity/categoria.entity';
import { CategoriaController } from 'src/controller/categoria.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria])],
  controllers: [CategoriaController],
  providers: [CategoriaService, CategoriaRepository],
})
export class CategoriaModule {}
