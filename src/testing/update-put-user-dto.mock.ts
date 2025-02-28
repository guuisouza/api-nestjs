import { Role } from '../enums/role.enum'
import { UpdatePutUserDTO } from '../user/dto/update-put-user.dto'

export const updatePutDTO: UpdatePutUserDTO = {
  birthAt: '2000-01-01',
  email: 'joao@hcode.com.br',
  name: 'Joao Rangel',
  password: 'Aa1217@',
  role: Role.User
}
