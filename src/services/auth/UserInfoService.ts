import prismaClient from '../../prisma';
import { responseApi } from '../../utils/responseApi';
import { UserInfoRequest } from '../../models/auth';

class UserInfoService {
  async execute({ userId }: UserInfoRequest) {
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
            balance: true,
            document: true,
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
  }
}

export { UserInfoService };
