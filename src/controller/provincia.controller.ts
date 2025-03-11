import { Controller } from '@nestjs/common';
import { BaseController } from './base.controller';
import { Provincia } from 'src/domain/localizacao/provincia/entity/provincia.entity';
import { ProvinciaService } from 'src/domain/localizacao/provincia/service/provincia.service';

@Controller('provincias')
export class ProvinciaController extends BaseController<Provincia> {
  constructor(private readonly provinciaService: ProvinciaService) {
    super(provinciaService);
  }
}
