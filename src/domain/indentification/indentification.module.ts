import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuditModule } from 'src/core/audit/audit.module';

import { DocType } from './docType/entity/doc-type.entity';
import { DocTypeRepository } from './docType/repository/doc-type.repository';
import { DocTypeService } from './docType/service/doc-type.service';
import { DocTypeController } from 'src/controller/domain-controller/identification-controller/doc-type.controller';

import { Country } from './country/entity/country.entity';
import { CountryRepository } from './country/repository/country.repository';
import { CountryService } from './country/service/country.service';
import { CountryController } from 'src/controller/domain-controller/identification-controller/country.controller';
import { ProvinceController } from 'src/controller/domain-controller/identification-controller/province.controller';
import { ProvinceRepository } from './province/repository/province.repository';
import { ProvinceService } from './province/service/province.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([DocType, Country]),
    AuditModule,
  ],
  providers: [
    DocTypeService,
    DocTypeRepository,
    CountryService,
    CountryRepository,
    ProvinceService,
    ProvinceRepository
  ],
  controllers: [
    DocTypeController,
    CountryController,
    ProvinceController
  ],
  exports: [
    DocTypeService,
    DocTypeRepository,
    CountryService,
    CountryRepository,
    ProvinceService,
    ProvinceRepository
  ],
})
export class IdentificationModule {}
