import { Request, Response } from 'express';
import { GetAllTransactionsService } from '../../services/ica/GetAllTransactionsService';

class GetAllTransactionsController {
  async handle(req: Request, res: Response): Promise<any> {
    const service = new GetAllTransactionsService();

    const { status, body } = await service.execute();
    return res.status(status).json(body);
  }
}

export { GetAllTransactionsController };
