import { Request, Response } from 'express';
import { RegisterAccountService } from '../../services/auth/RegisterAccountService';

class RegisterAccountController {
  async handle(req: Request, res: Response): Promise<any> {
    const { name, email, password, document, type } = req.body;

    const service = new RegisterAccountService();

    const { status, body } = await service.execute({
      name,
      email,
      password,
      document,
      type,
    });

    return res.status(status).json(body);
  }
}

export { RegisterAccountController };
