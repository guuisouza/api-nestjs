import { Role } from '../enums/role.enum'
import { UserEntity } from '../user/entity/user.entity'

export const userEntityList: UserEntity[] = [
  {
    name: 'Joao Rangel',
    email: 'joao@hcode.com.br',
    birthAt: new Date('2000-01-01'),
    id: 1,
    password: '$2b$10$BgTHPlzqZsKxkzhhp0yi1O2/MvyThoPCXgBfZJBDcYDxa3NZD4yRC',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Glaucio Daniel',
    email: 'glaucio@hcode.com.br',
    birthAt: new Date('2000-01-01'),
    id: 1,
    password: '$2b$10$BgTHPlzqZsKxkzhhp0yi1O2/MvyThoPCXgBfZJBDcYDxa3NZD4yRC',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: 'Djalma Sindaux',
    email: 'djalma@hcode.com.br',
    birthAt: new Date('2000-01-01'),
    id: 1,
    password: '$2b$10$BgTHPlzqZsKxkzhhp0yi1O2/MvyThoPCXgBfZJBDcYDxa3NZD4yRC',
    role: Role.Admin,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]
