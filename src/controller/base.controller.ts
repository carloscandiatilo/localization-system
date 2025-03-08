import { Controller, Get, Post, Param, Body, Put, Delete, Query } from '@nestjs/common';
import { BaseService } from 'src/core/base/service/base.service';
import { NotFoundException } from '@nestjs/common';

@Controller('base')
export class BaseController<T extends { id: number; isDeleted?: boolean }> {
  constructor(private readonly service: BaseService<T>) {}

  @Get()
  async findAll(
    @Query('paginador') paginador: string = 'true',
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
    @Query('orderBy') orderBy?: string,
    @Query('order') order: 'asc' | 'desc' = 'asc'
  ) {
    const aplicarPaginacao = paginador !== 'false';
    const pagina = parseInt(page, 10) || 1;
    const limite = aplicarPaginacao ? parseInt(limit, 10) || 5 : 0;

    const ordenar = orderBy
      ? { column: orderBy as keyof T, direction: order }
      : undefined;
    return await this.service.getAll(aplicarPaginacao, pagina, limite, ordenar);
  }

  

  @Get(':id')
  async findById(@Param('id') id: number) {
    const result = await this.service.getById(id);
    if (typeof result === 'string') {
      throw new NotFoundException(result);
    }
    return result;
  }

  @Post()
  async create(@Body() data: Partial<T>) {
    const result = await this.service.create(data);
    if (typeof result === 'string') {
      throw new NotFoundException(result);
    }
    return result;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: Partial<T>) {
    const result = await this.service.update(id, data);
    if (typeof result === 'string') {
      throw new NotFoundException(result);
    }
    return result; 
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    const result = await this.service.softDelete(id);
    if (typeof result === 'string') {
      throw new NotFoundException(result);
    }
    return { message: result };
  }

  @Delete(':id')
  async hardDelete(@Param('id') id: number) {
    const result = await this.service.hardDelete(id);
    if (typeof result === 'string') {
      throw new NotFoundException(result);
    }
    return { message: result };
  }
}
