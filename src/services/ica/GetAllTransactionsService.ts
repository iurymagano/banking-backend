import axios from 'axios';
import { responseApi } from '../../utils/responseApi';
import { tokenManagerIca } from './TokenManagerIca';
import prismaClient from '../../prisma';

class GetAllTransactionsService {
  async execute() {
    try {
      const tokenIca = await tokenManagerIca.getInstance().getToken();

      const account = await prismaClient.account.findMany();

      const idsAccount = account.map(({ accountId }) => accountId);
      const headers = {
        Authorization: `Bearer ${tokenIca}`,
      };

      const url = `${process.env.API_SERVER_ICA}/account`;
      const promisesAccounts = idsAccount.map((id) => {
        const resp = axios.get(`${url}/${id}/statement`, { headers });
        return resp;
      });

      const resultsAccounts = await Promise.all(promisesAccounts);

      const accountsIca = resultsAccounts
        .filter((item) => item.status === 200)
        .map((item) => item.data);

      const objectAccountIds = account.reduce((acc, item) => {
        acc[item.accountId] = item;
        return acc;
      }, {});

      const data = accountsIca
        .reduce((acc, item) => {
          const transctions = item.transactions.map((transaction) => {
            return {
              ...transaction,
              name: objectAccountIds[item.accountId].name,
              typeAccount: objectAccountIds[item.accountId].type,
              document: objectAccountIds[item.accountId].document,
            };
          });
          acc.push(...transctions);

          return acc;
        }, [])
        //@ts-ignore
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return responseApi({
        result: 'success',
        data,
      });
    } catch (error) {
      return responseApi({
        result: 'error',
        message: 'Error in get all accounts',
      });
    }
  }
}

export { GetAllTransactionsService };
