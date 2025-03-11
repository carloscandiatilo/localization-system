import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProvinciaService } from './service/provincia.service';
import { ProvinciaRepository } from './repository/provincia.repository';
import { Provincia } from './entity/provincia.entity';
import { AuditModule } from 'src/domain/audit/audit.module';
import { ProvinciaController } from 'src/controller/provincia.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Provincia]), AuditModule],
  controllers: [ProvinciaController],
  providers: [ProvinciaService, ProvinciaRepository],
})
export class ProvinciaModule {}
