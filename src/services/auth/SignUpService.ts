import prismaClient from '../../prisma';
import { responseApi } from '../../utils/responseApi';
import 'dotenv/config';
import { RegisterAccountRequest } from '../../models/auth';
import { hash } from 'bcrypt';
import { RegisterAccountIcaService } from '../ica/RegisterAccountIcaService';
import { DataCreateAccount } from '../../models/ica';
import { sign } from 'jsonwebtoken';

class SignUpService {
  async execute({
    name,
    email,
    password,
    document,
    type,
  }: RegisterAccountRequest) {
    try {
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

      const service = await new RegisterAccountIcaService().execute({
        accountType: type,
        document,
        name,
      });

      if (service.body.result !== 'success') {
        return responseApi({
          result: 'error',
          message: 'Usuário já existe.',
          status: 400,
        });
      }
      const dataAccount = service.body.data as DataCreateAccount;
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
              accountId: dataAccount.id,
              branch: dataAccount.branch,
              number: dataAccount.number,
              tenantId: dataAccount.tenantId,
            },
          },
        },
        select: {
          id: true,
          name: true,
          email: true,
          accounts: {
            select: {
              id: true,
              name: true,
              type: true,
              document: true,
              accountId: true,
              branch: true,
              number: true,
              tenantId: true,
            },
          },
        },
      });

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
        message: 'Usuário criado com sucesso.',
        data: { user, token },
      });
    } catch (error) {
      return responseApi({
        result: 'error',
        message: 'Erro ao criar usuário.',
        status: 400,
      });
    }
  }
}

export { SignUpService };
