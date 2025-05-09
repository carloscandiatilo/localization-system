import {CallHandler, ExecutionContext,Injectable, NestInterceptor, UnauthorizedException} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.user && request.user.userId) {
      const userId = request.user.userId;

      // Evita erro se não houver body (ex: GET, DELETE sem payload)
      if (request.body) {
        if (request.method === 'POST') {
          request.body.createdBy = userId;
        } else if (request.method === 'PUT') {
          request.body.updatedBy = userId;
        } else if (request.method === 'DELETE') {
          request.body.deletedBy = userId;
        }
      }
    } else {
      throw new UnauthorizedException('Não encontrou o id do usuário.');
    }

    return next.handle();
  }
}
