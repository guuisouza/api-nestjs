import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common'
import { Observable, tap } from 'rxjs'

export class LogInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    const dataInicial = Date.now()

    return next.handle().pipe(
      tap(() => {
        const requestUrl = context.switchToHttp().getRequest()

        console.log(`URL acessada: ${requestUrl.url}`)
        console.log(`METODO acessado: ${requestUrl.method}`)
        console.log(`A execução levou ${Date.now() - dataInicial} milisegundos`)
      })
    )
  }
}
