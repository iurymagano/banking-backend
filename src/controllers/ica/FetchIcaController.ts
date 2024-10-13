import { Request, Response } from 'express';
import { FetchIcaService } from '../../services/ica/FetchIcaService';

class FetchIcaController {
  async handle(req: Request, res: Response): Promise<any> {
    const { path, request, headers } = req.body;

    const service = new FetchIcaService();

    const { status, body } = await service.execute({
      path,
      request,
      headers,
    });
    return res.status(status).json(body);
  }
}

export { FetchIcaController };
