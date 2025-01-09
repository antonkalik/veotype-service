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
        return res.status(400).json({ error: 'Bad Request' });
      case 401:
        return res.status(401).json({ error: 'Unauthorized' });
      case 403:
        return res.status(403).json({ error: 'Forbidden' });
      case 404:
        return res.status(404).json({ error: 'Not Found' });
      case 409:
        return res.status(409).json({ error: 'Conflict' });
      case 422:
        return res.status(422).json({ error: 'Unprocessable Entity' });
      default:
        return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  next();
};
