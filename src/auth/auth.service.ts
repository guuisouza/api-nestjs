import {
  BadRequestException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthRegisterDTO } from './dto/auth-register.dto'
import { UserService } from 'src/user/user.service'
import * as bcrypt from 'bcrypt'
import { MailerService } from '@nestjs-modules/mailer'

@Injectable()
export class AuthService {
  private issuer = 'login'
  private audience = 'users'

  constructor(
    private readonly JWTService: JwtService,
    private readonly userService: UserService,
    private readonly mailer: MailerService
  ) {}

  createToken(user: User) {
    return {
      acessToken: this.JWTService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience
        }
      )
    }
  }

  checkToken(token: string) {
    try {
      const data = this.JWTService.verify(token, {
        issuer: this.issuer,
        audience: this.audience
      })

      return data
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token)
      return true
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return false
    }
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email
      }
    })

    if (!user) {
      throw new UnauthorizedException('Email e/ou senha incorretos.')
    }

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Email e/ou senha incorretos.')
    }

    return this.createToken(user)
  }

  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email
      }
    })

    if (!user) {
      throw new UnauthorizedException('Email está incorreto.')
    }

    const token = await this.JWTService.sign(
      {
        id: user.id
      },
      {
        expiresIn: '30 minutes',
        subject: String(user.id),
        issuer: 'forget',
        audience: 'users'
      }
    )

    await this.mailer.sendMail({
      subject: 'Recuperação de senha',
      to: 'joao@hcode.com.br',
      template: 'forget',
      context: {
        name: user.name,
        token: token
      }
    })
    return true
  }

  async reset(password: string, token: string) {
    try {
      const data: any = this.JWTService.verify(token, {
        issuer: 'forget',
        audience: 'users'
      })

      if (isNaN(Number(data.id))) {
        throw new BadRequestException('Token é inválido')
      }

      const salt = await bcrypt.genSalt()
      password = await bcrypt.hash(password, salt)

      const user = await this.prisma.user.update({
        where: {
          id: Number(data.id)
        },
        data: {
          password
        }
      })

      return this.createToken(user)
    } catch (error) {
      throw new BadRequestException(error)
    }
  }

  async register(data: AuthRegisterDTO) {
    const user = await this.userService.create(data)

    this.createToken(user)
  }
}
