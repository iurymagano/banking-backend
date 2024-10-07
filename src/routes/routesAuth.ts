import { Request, Response, Router } from 'express';
import { LoginController } from '../controllers/auth/LoginController';
import { RegisterAccountController } from '../controllers/auth/RegisterAccountController';
import { UserInfoController } from '../controllers/auth/UserInfoController';
import { isAuthenticated } from '../middleware/IsAuthticated';

const router = Router();

router.get('/', (req: Request, res: Response): Promise<void> => {
  //@ts-ignore
  return res.json({ message: 'Hello World' });
});

router.post('/login', new LoginController().handle);

router.post('/register', new RegisterAccountController().handle);

router.get('/me', isAuthenticated, new UserInfoController().handle);

export default router;
