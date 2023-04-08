import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, tap } from 'rxjs';

export class LogInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const dt = Date.now();

    return next.handle().pipe(
      tap(() => {
        console.log({
          url: context.switchToHttp().getRequest().url,
          method: context.switchToHttp().getRequest().method,
          params: context.switchToHttp().getRequest().params,
          body: context.switchToHttp().getRequest().body,
          menssage: `Execução levou: ${Date.now() - dt} milisegundos.`,
        });
      }),
    );
  }
}
