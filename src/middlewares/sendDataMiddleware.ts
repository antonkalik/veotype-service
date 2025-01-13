import type { NextFunction, Request, Response } from 'express';

export const sendDataMiddleware = (_: Request, res: Response, next: NextFunction) => {
  res.sendData = <T>(data: T, status: number = 200): Response => {
    if (data['context']) {
      delete data['context'];
    }
    return res.status(status).json({ data });
  };
  next();
};
