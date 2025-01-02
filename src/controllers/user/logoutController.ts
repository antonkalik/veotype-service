import type { Request, Response } from 'express';
import { SessionService } from 'src/services/SessionService';

export async function logoutController(req: Request, res: Response) {
  try {
    await SessionService.del(req.user.id);
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
}
