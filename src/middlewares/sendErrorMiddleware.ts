import type { NextFunction, Request, Response } from 'express';

export const sendErrorMiddleware = (req: Request, res: Response, next: NextFunction) => {
  res.sendError = (status: number = 500, error?: string) => {
    if (error) {
      console.error(`[ERROR] ${status}`, { error });
      return res.status(status).json({ error });
    }

    if (status === 500) {
      console.error(`[ERROR] ${status}`, { error });
    }

    switch (status) {
      case 400:
        return res.status(400).json({ message: 'Bad Request' });
      case 401:
        return res.status(401).json({ message: 'Unauthorized' });
      case 403:
        return res.status(403).json({ message: 'Forbidden' });
      case 404:
        return res.status(404).json({ message: 'Not Found' });
      case 409:
        return res.status(409).json({ message: 'Conflict' });
      case 422:
        return res.status(422).json({ message: 'Unprocessable Entity' });
      default:
        return res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  next();
};
