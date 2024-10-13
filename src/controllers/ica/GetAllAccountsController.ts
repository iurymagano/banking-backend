import { Request, Response } from 'express';
import { GetAllAccountsService } from '../../services/ica/GetAllAccountsService';

class GetAllAccountsController {
  async handle(req: Request, res: Response): Promise<any> {
    const service = new GetAllAccountsService();

    const { status, body } = await service.execute();
    return res.status(status).json(body);
  }
}

export { GetAllAccountsController };
