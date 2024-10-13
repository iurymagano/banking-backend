import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { tokenManagerIca } from '../services/ica/TokenManagerIca';

interface Payload {
  sub: string;
}

export async function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as Payload;

    req.userId = sub;

    return next();
  } catch (error) {
    return res.status(401).end();
  }
}
