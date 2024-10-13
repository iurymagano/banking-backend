import { NextFunction, Request, Response } from 'express';
import { tokenManagerIca } from '../services/ica/TokenManagerIca';

export async function isAuthIca(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> {
  try {
    const token = await tokenManagerIca.getInstance().getToken();

    if (!token) {
      return res
        .status(401)
        .json({ result: 'error', message: 'Not Authorization client ica' });
    }

    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ result: 'error', message: 'Not Authorization client ica' });
  }
}
