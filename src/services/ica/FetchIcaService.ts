import axios from 'axios';
import { responseApi } from '../../utils/responseApi';
import { tokenManagerIca } from './TokenManagerIca';
import { IcaRequestApi } from '../../models/ica';

class FetchIcaService {
  async execute({ path, request, headers }: IcaRequestApi) {
    try {
      const tokenIca = await tokenManagerIca.getInstance().getToken();

      const header = {
        Authorization: `Bearer ${tokenIca}`,
        ...headers,
      };

      const url = `${process.env.API_SERVER_ICA}${path}`;
      const resp = await axios.request({ url, headers: header, ...request });

      if (!resp.data) {
        return responseApi({
          status: 404,
          result: 'error',
          message: 'No data returned from the API',
        });
      }

      return responseApi({
        result: 'success',
        data: resp.data,
      });
    } catch (error) {
      console.log(error);
      return responseApi({
        status: 404,
        result: 'error',
        message:
          'Error connect to the API' +
          'clientID' +
          process.env.CLIENT_ID +
          'clientSecret' +
          process.env.CLIENT_SECRET +
          process.env.API_SERVER_ICA,
      });
    }
  }
}

export { FetchIcaService };
