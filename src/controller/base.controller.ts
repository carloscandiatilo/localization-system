import { 
  Controller, Get, Post, Param, Body, Put, Delete, Query, HttpCode, HttpStatus, UseGuards, Logger, NotFoundException, Request, UseInterceptors, Req, UnauthorizedException
} from '@nestjs/common';
import { BaseService } from 'src/core/base/service/base.service';
import { JwtAuthGuard } from 'src/core/auth/guard/jwt-auth.guard';
import { UserInterceptor } from 'src/core/auth/user/interceptor/user.interceptor';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ValidationMessages } from 'src/shared/messages/validation-messages';

@ApiTags('Base')
@ApiBearerAuth()
@UseInterceptors(UserInterceptor)
@Controller('base')
@UseGuards(JwtAuthGuard)
export class BaseController<T extends { id: number; isDeleted?: boolean }> {
  private readonly logger = new Logger(BaseController.name);

  constructor(private readonly service: BaseService<T>) {}

  @Get()
  @ApiOperation({ summary: 'Lista todos os registros' })
  @ApiResponse({ status: 200, description: ValidationMessages.LIST_RETURNED_SUCCESSFULLY })
  async findAll(
    @Query() query: Record<string, string>,
    @Query('paginador') paginador: string = 'true',
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '5',
    @Query('orderBy') orderBy?: string,
    @Query('order') order: 'asc' | 'desc' = 'asc',
  ) {
    const aplicarPaginacao = paginador !== 'false';
    const pagina = parseInt(page, 10) || 1;
    const limite = aplicarPaginacao ? parseInt(limit, 10) || 5 : 0;

    const ordenar = orderBy? { column: orderBy as keyof T, direction: order }: undefined;
    const {paginador: _, page: __, limit: ___, orderBy: ____, order: _____, ...rawFiltros} = query;

    const filtros: Partial<T> = Object.entries(rawFiltros).reduce((acc, [key, value]) => {
      if (!isNaN(Number(value))) {
        acc[key as keyof T] = Number(value) as any;
      } else if (value.toLowerCase() === 'true' || value.toLowerCase() === 'false') {
        acc[key as keyof T] = (value.toLowerCase() === 'true') as any;
      } else {
        acc[key as keyof T] = value as any;
      }
      return acc;
    }, {} as Partial<T>);

    return await this.service.getAll(aplicarPaginacao, pagina, limite, ordenar, filtros);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um registro pelo ID' })
  @ApiResponse({ status: 200, description: ValidationMessages.RECORD_FOUND })
  @ApiResponse({ status: 404, description: ValidationMessages.RECORD_NOT_FOUND })
  async findById(@Param('id') id: number) {
    const result = await this.service.getById(id);
    if (typeof result === 'string') {
      throw new NotFoundException(result);
    }
    return result;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Cria um novo registro' })
  @ApiResponse({ status: 201, description: ValidationMessages.RECORD_CREATED_SUCCESSFULLY })
  async create(@Body() data: Partial<T>, @Request() req) {
    const userId = req.user?.userId;
    if (!userId) throw new Error(ValidationMessages.USER_NOT_AUTHENTICATED);
    return this.service.create(data, userId);
  }
  
  @Put(':id')
  @ApiOperation({ summary: 'Atualiza um registro' })
  @ApiResponse({ status: 200, description: ValidationMessages.RECORD_UPDATED_SUCCESSFULLY })
  @ApiResponse({ status: 404, description: ValidationMessages.RECORD_NOT_FOUND })
  async update(@Param('id') id: number, @Body() data: Partial<T>, @Request() req) {
    const userId = req.user.userId;
    const result = await this.service.update(id, data, userId);
    if (typeof result === 'string') {
      throw new NotFoundException(result);
    }
    return result;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Realiza a exclusão lógica de um registro' })
  async delete(@Param('id') id: number, @Req() req: any) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new UnauthorizedException(ValidationMessages.USER_NOT_AUTHENTICATED);
    }

    const result = await this.service.softDelete(id, userId);
    if (typeof result === 'string') {
      throw new NotFoundException(result);
    }
    return { message: result };
  }

  @Delete('hard-delete/:id')
  @ApiOperation({ summary: 'Exclui permanentemente um registro' })
  async hardDelete(@Param('id') id: number, @Req() req: any) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new UnauthorizedException(ValidationMessages.USER_NOT_AUTHENTICATED);
    }

    const result = await this.service.hardDelete(id, userId);
    if (typeof result === 'string') {
      throw new NotFoundException(result);
    }
    return { message: result };
  }

  @Post(':id/restore')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Restaura um registro excluído' })
  async restore(@Param('id') id: string, @Request() req) {
    const userId = req.user.userId;
    return await this.service.restore(Number(id), userId);
  }
}
