import axios from 'axios';
import Cache from 'node-cache';

class tokenManagerIca {
  private static instance: tokenManagerIca;
  private tokenCache: Cache;
  private tokenKey = 'tokenIca';

  private constructor() {
    this.tokenCache = new Cache({ stdTTL: 3600 });
  }

  public static getInstance(): tokenManagerIca {
    if (!tokenManagerIca.instance) {
      tokenManagerIca.instance = new tokenManagerIca();
    }
    return tokenManagerIca.instance;
  }

  public async getToken(): Promise<string | null> {
    try {
      let token = this.tokenCache.get<string>(this.tokenKey);

      if (token) {
        return token;
      }
      const response = await axios.post(
        process.env.API_SERVER_ICA + '/auth/login',
        {
          clientId: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
        },
      );

      if (response.status === 201) {
        token = response.data.access_token;
        this.tokenCache.set(this.tokenKey, token);
        return token;
      }

      return null;
    } catch (error) {
      return null;
    }
  }

  public invalidateToken() {
    this.tokenCache.del(this.tokenKey);
  }
}

export { tokenManagerIca };
