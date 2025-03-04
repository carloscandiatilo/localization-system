import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { BaseRepository } from 'src/core/base/repository/base.repository';
import { Cliente } from '../entity/cliente.entity';

@Injectable()
export class ClienteRepository extends BaseRepository<Cliente> {
  constructor(dataSource: DataSource) {
    super(Cliente, dataSource);
  }
}


