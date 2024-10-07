import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import prismaClient from '../../prisma';
import { responseApi } from '../../utils/responseApi';
import { AuthRequest } from '../../models/auth';

class LoginService {
  async execute({ email, password }: AuthRequest) {
    if (!email || !password) {
      return responseApi({
        result: 'error',
        message: 'Obrigatório email e password',
        status: 400,
      });
    }

    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      return responseApi({
        result: 'error',
        message: 'Email/Password inválido.',
        status: 401,
      });
    }

    const passowordMatch = await compare(password, user.password);

    if (!passowordMatch) {
      return responseApi({
        result: 'error',
        message: 'Email/Password inválido.',
        status: 401,
      });
    }

    const token = sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      {
        subject: user.id.toString(),
        expiresIn: '30d',
      },
    );

    return responseApi({
      result: 'success',
      message: 'Login efetuado com sucesso.',
      data: { token },
    });
  }
}

export { LoginService };
