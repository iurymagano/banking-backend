import { Request, Response } from 'express';
import { UserInfoService } from '../../services/auth/UserInfoService';

class UserInfoController {
  async handle(req: Request, res: Response): Promise<any> {
    const { userId } = req;

    const service = new UserInfoService();

    const { status, body } = await service.execute({ userId: Number(userId) });

    return res.status(status).json(body);
  }
}

export { UserInfoController };
