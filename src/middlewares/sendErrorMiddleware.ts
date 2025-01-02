import type { NextFunction, Request, Response } from 'express';

export const sendErrorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.sendError = ({ error, status = 500 }: { error: string; status?: number }) =>
    res.status(status).json({ error });
  next();
};
