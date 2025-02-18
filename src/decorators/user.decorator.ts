import {
  createParamDecorator,
  ExecutionContext,
  NotFoundException
} from '@nestjs/common'

export const User = createParamDecorator(
  (filters: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest()

    if (request.user) {
      if (filters) {
        return request.user[filters]
      } else {
        return request.user
      }
    } else {
      throw new NotFoundException(
        'Usuário não encontrado no request, use o AuthGuard para obter o usuário'
      )
    }
  }
)
