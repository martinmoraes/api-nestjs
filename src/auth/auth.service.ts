import { UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { AuthRegisterDTO } from './dto/auth-regiter.dto';
import { UserService } from '../user/user.service';

export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {
    console.log({ prisma: this.prisma });
  }

  async createToken(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: 'login',
          audience: 'users',
        },
      ),
    };
  }

  async checkToken(token: string) {
    // return this.jwtService.verify();
  }

  async login(email: string, password: string) {
    const users = await this.prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });
    console.log({ users });

    if (!users) {
      throw new UnauthorizedException('E-mail e/ou senha incorretos.');
    }

    return this.createToken(users);
  }

  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('E-mailestá incorretos.');
    }

    //TO DO: Enviar o e-mail...
    return true;
  }

  async reset(password: string, token: string) {
    //TO DO Validar o token...

    const id = 0;
    const user = await this.prisma.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {
    const userId = await this.userService.create(data);
    const user = await this.userService.show(userId.id);

    return this.createToken(user);
  }
}
