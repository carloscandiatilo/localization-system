import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CriancaController } from 'src/controller/crianca.controller';
import { Crianca } from './entity/crianca.entity';
import { CriancaRepository } from './repository/crianca.repository';
import { CriancaService } from './service/crianca.service';

@Module({
  imports: [TypeOrmModule.forFeature([Crianca])],
  controllers: [CriancaController],
  providers: [CriancaService, CriancaRepository],
})
export class CriancaModule {}
