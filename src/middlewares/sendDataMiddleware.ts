import type { NextFunction, Request, Response } from 'express';

export const sendDataMiddleware = (_: Request, res: Response, next: NextFunction) => {
  res.sendData = <T>({ data, status = 200 }: { data: T; status?: number }): Response => {
    delete data['context'];
    return res.status(status).json({ data });
  };
  next();
};
