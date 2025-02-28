import { Role } from '../enums/role.enum'
import { CreateUserDTO } from '../user/dto/create-user.dto'

export const createUserDTO: CreateUserDTO = {
  birthAt: '2000-01-01',
  email: 'joao@hcode.com.br',
  name: 'Joao Rangel',
  password: 'Aa1217@',
  role: Role.User
}
