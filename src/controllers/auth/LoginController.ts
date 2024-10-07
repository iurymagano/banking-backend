import { Request, Response } from 'express';
import { LoginService } from '../../services/auth/LoginService';

class LoginController {
  async handle(req: Request, res: Response): Promise<any> {
    const { email, password } = req.body;

    const service = new LoginService();

    const { status, body } = await service.execute({
      email,
      password,
    });

    return res.status(status).json(body);
  }
}

export { LoginController };
