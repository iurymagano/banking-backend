import { Request, Response } from 'express';
import { SignUpService } from '../../services/auth/SignUpService';

class SignUpController {
  async handle(req: Request, res: Response): Promise<any> {
    const { name, email, password, document, type } = req.body;

    const service = new SignUpService();

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

export { SignUpController };
