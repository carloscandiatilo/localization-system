import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.user && request.user.userId) {  // Verifica se userId existe
      const userId = request.user.userId;

      if (request.method === 'POST') {
        request.body.createdBy = userId;
      } else if (request.method === 'PUT') {
        request.body.updatedBy = userId;
      } else if (request.method === 'DELETE') {  // 🟢 Novo: captura userId ao excluir
        request.body.deletedBy = userId;  // Armazena o userId para exclusão
      }
    }

    return next.handle();
  }
}
