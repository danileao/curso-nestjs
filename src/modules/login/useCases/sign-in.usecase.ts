import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInDTO } from '../dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/infra/database/prisma.service';
import { compare } from 'bcrypt';
import { IUserRepository } from 'src/modules/users/repositories/user.repository';
@Injectable()
export class SignInUseCase {
  constructor(
    private jwtService: JwtService,
    private userRepository: IUserRepository,
  ) {}

  async execute(data: SignInDTO) {
    // Validar se username existe no meu banco
    const user = await this.userRepository.findByUsername(data.username);

    // NAO existe - Retorna ERRO
    if (!user) {
      throw new UnauthorizedException();
    }

    // SIM - Validar a senha
    const isEqualPassword = await compare(data.password, user.password);

    // NÃO - Retornar o error
    if (!isEqualPassword) {
      throw new UnauthorizedException();
    }

    const payload = {
      sub: user.id,
      username: user.username,
    };

    const token = await this.jwtService.signAsync(payload);

    // SIM - Gerar o token
    return {
      access_token: token,
    };
  }
}
