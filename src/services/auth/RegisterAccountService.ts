import prismaClient from '../../prisma';
import { responseApi } from '../../utils/responseApi';
import 'dotenv/config';
import { RegisterAccountRequest } from '../../models/auth';
import { hash } from 'bcrypt';
class RegisterAccountService {
  async execute({
    name,
    email,
    password,
    document,
    type,
  }: RegisterAccountRequest) {
    if (!name || !email || !password || !document || !type) {
      return responseApi({
        result: 'error',
        message: 'Obrigatório name, email, password, document e type',
      });
    }

    const emailTypeExist = await prismaClient.user.findFirst({
      where: {
        email: email,
        accounts: {
          some: {
            type: type,
          },
        },
      },
    });

    if (emailTypeExist) {
      return responseApi({
        result: 'error',
        message: 'Usuário já existe.',
        status: 400,
      });
    }

    const documentExist = await prismaClient.account.findFirst({
      where: {
        document,
      },
    });

    if (documentExist) {
      return responseApi({
        result: 'error',
        message: 'Usuário já existe.',
        status: 400,
      });
    }
    const passHash = await hash(password, 8);
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passHash,
        accounts: {
          create: {
            name,
            document,
            type,
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });

    return responseApi({
      result: 'success',
      message: 'Usuário criado com sucesso.',
      data: user,
    });
  }
}

export { RegisterAccountService };
