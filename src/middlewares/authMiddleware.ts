import { SessionService } from 'src/services/SessionService';
import type { Request, Response, NextFunction } from 'express';
import type { UserSession } from 'src/@types';
import { TokenService } from 'src/services/TokenService';

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!token) return res.sendStatus(401);

  if (!JWT_SECRET) {
    return res.sendStatus(500);
  }

  const tokenServiceResponse = await TokenService.verify<UserSession>(token);

  if (!tokenServiceResponse.success) {
    return res.sendStatus(401);
  }

  const sessionServiceResponse = await SessionService.get(tokenServiceResponse.data.id);

  if (!sessionServiceResponse.success) {
    return res.sendStatus(401);
  }

  const storedToken = sessionServiceResponse.data;

  if (!storedToken || storedToken !== token) {
    return res.sendStatus(401);
  }
  req.user = tokenServiceResponse.data;
  next();
}
