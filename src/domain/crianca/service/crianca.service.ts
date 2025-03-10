import { Injectable, BadRequestException } from '@nestjs/common';
import { BaseService } from 'src/core/base/service/base.service';
import { DataSource } from 'typeorm';
import { CriancaRepository } from '../repository/crianca.repository';
import { Crianca } from '../entity/crianca.entity';

@Injectable()
export class CriancaService extends BaseService<Crianca> {
  constructor(
    protected readonly criancaRepository: CriancaRepository,
    protected readonly dataSource: DataSource 
  ) {
    super(criancaRepository, dataSource); 
  }
}
