import { Controller } from '@nestjs/common';
import { BaseController } from 'src/controller/core-controller/base.controller';
import { Country } from 'src/domain/indentification/country/entity/country.entity';
import { Province } from 'src/domain/indentification/province/entity/province.entity';
import { ProvinceService } from 'src/domain/indentification/province/service/province.service';

@Controller('province')
export class ProvinceController extends BaseController<Province> {
  constructor(private readonly provinceService: ProvinceService) {
    super(provinceService); 
  }
}