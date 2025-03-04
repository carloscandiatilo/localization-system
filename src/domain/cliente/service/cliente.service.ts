import { Injectable } from '@nestjs/common';

import { BaseService } from 'src/core/base/service/base.service';
import { Cliente } from '../entity/cliente.entity';
import { ClienteRepository } from '../repository/cliente.repository';

@Injectable()
export class ClienteService extends BaseService<Cliente> {
  constructor(private readonly clienteRepository: ClienteRepository) {
    super(clienteRepository); 
  }
}
