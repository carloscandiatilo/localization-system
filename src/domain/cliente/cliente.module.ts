import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entity/cliente.entity';
import { ClienteService } from './service/cliente.service';
import { ClienteRepository } from './repository/cliente.repository';
import { ClienteController } from 'src/controller/cliente.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [ClienteController],
  providers: [ClienteService, ClienteRepository],
})
export class ClienteModule {}
