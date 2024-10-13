import axios from 'axios';
import { RegisterAccountIca } from '../../models/ica';
import { responseApi } from '../../utils/responseApi';
import { tokenManagerIca } from './TokenManagerIca';

class RegisterAccountIcaService {
  async execute({ name, accountType, document }: RegisterAccountIca) {
    try {
      if (!name || !accountType || !document) {
        return responseApi({
          result: 'error',
          message: 'Obrigatório name, document e type',
        });
      }

      const data = { name, accountType, document };

      const tokenIca = await tokenManagerIca.getInstance().getToken();
      const resp = await axios.post(
        process.env.API_SERVER_ICA + '/account',
        data,
        {
          headers: {
            Authorization: `Bearer ${tokenIca}`,
          },
        },
      );

      if (resp.status !== 201) {
        return responseApi({
          result: 'error',
          message: 'Not found create account',
        });
      }

      return responseApi({
        result: 'success',
        message: 'Usuário criado com sucesso.',
        data: resp.data,
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

export { RegisterAccountIcaService };
