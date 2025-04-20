import { Controller } from '@nestjs/common';
import { BaseController } from 'src/controller/core-controller/base.controller';
import { Country } from 'src/domain/indentification/country/entity/country.entity';
import { CountryService } from 'src/domain/indentification/country/service/country.service';

@Controller('country')
export class CountryController extends BaseController<Country> {
  constructor(private readonly countryService: CountryService) {
    super(countryService); 
  }
}