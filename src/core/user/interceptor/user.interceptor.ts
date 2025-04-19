import {CallHandler, ExecutionContext, Injectable, NestInterceptor, UnauthorizedException} from '@nestjs/common';
import { Observable } from 'rxjs';
@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    //console.log("Usuário autenticado:", request.user);

    if (request.user && request.user.userId) {
      const userId = request.user.userId;

      if (request.method === 'POST') {
        request.body.createdBy = userId;
      } else if (request.method === 'PUT') {
        request.body.updatedBy = userId;
      } else if (request.method === 'DELETE') {
        request.body.deletedBy = userId;
      }
    } else {
      throw new UnauthorizedException('Não encontrou o id do usuário.');
    }
    return next.handle();
  }
}
