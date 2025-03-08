import { Injectable } from '@nestjs/common';

import { BaseService } from 'src/core/base/service/base.service';
import { Cliente } from '../entity/cliente.entity';
import { ClienteRepository } from '../repository/cliente.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class ClienteService extends BaseService<Cliente> {
  constructor(
    private readonly clienteRepository: ClienteRepository,
    protected readonly dataSource: DataSource  
) {
    super(clienteRepository, dataSource); 
  }
}
