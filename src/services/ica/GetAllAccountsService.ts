import axios from 'axios';
import { responseApi } from '../../utils/responseApi';
import { tokenManagerIca } from './TokenManagerIca';
import prismaClient from '../../prisma';

class GetAllAccountsService {
  async execute() {
    try {
      const tokenIca = await tokenManagerIca.getInstance().getToken();

      const account = await prismaClient.account.findMany();

      const removeAccountAdm = account.filter(
        (item) => item.document !== '737.425.410-56',
      );

      const idsAccount = removeAccountAdm.map(({ accountId }) => accountId);
      const headers = {
        Authorization: `Bearer ${tokenIca}`,
      };

      const url = `${process.env.API_SERVER_ICA}/account`;
      const promisesAccounts = idsAccount.map((id) => {
        const resp = axios.get(`${url}/${id}`, { headers });
        return resp;
      });

      const resultsAccounts = await Promise.all(promisesAccounts);

      const accounts = resultsAccounts
        .filter((item) => item.status === 200)
        .map((item) => item.data)
        .sort((a, b) => a.name.localeCompare(b.name));

      return responseApi({
        result: 'success',
        data: accounts,
      });
    } catch (error) {
      return responseApi({
        result: 'error',
        message: 'Error in get all accounts',
      });
    }
  }
}

export { GetAllAccountsService };
