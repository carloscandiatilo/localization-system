import { Controller } from '@nestjs/common';
import { BaseController } from './base.controller';
import { Cliente } from 'src/domain/cliente/entity/cliente.entity';
import { ClienteService } from 'src/domain/cliente/service/cliente.service';

@Controller('clientes')
export class ClienteController extends BaseController<Cliente> {
  constructor(private readonly clienteService: ClienteService) {
    super(clienteService);
  }

}
