import prismaClient from '../../prisma';
import { responseApi } from '../../utils/responseApi';
import { UserInfoRequest } from '../../models/auth';

class UserInfoService {
  async execute({ userId }: UserInfoRequest) {
    try {
      if (!userId) {
        return responseApi({
          result: 'error',
          message: 'Usuário não encontrado',
          status: 401,
        });
      }

      const getUser = await prismaClient.user.findFirst({
        where: { id: userId },
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

      if (!getUser) {
        return responseApi({
          result: 'error',
          message: 'Usuário não encontrado',
          status: 404,
        });
      }

      return responseApi({
        result: 'success',
        data: getUser,
      });
    } catch (error) {
      return responseApi({
        result: 'error',
        message: 'Algo aconteceu de errado.',
        status: 404,
      });
    }
  }
}

export { UserInfoService };
