import { Controller, Get, Query } from '@nestjs/common';
import { BaseController } from './base.controller';
import { Crianca } from 'src/domain/crianca/entity/crianca.entity';
import { CriancaService } from 'src/domain/crianca/service/crianca.service';

@Controller('criancas')
export class CriancaController extends BaseController<Crianca> {
  constructor(private readonly criancaService: CriancaService) {
    super(criancaService);
  }
}
