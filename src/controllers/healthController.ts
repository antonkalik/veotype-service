import { Request, Response } from 'express';

export const healthController = (_: Request, res: Response) => res.sendData({ status: 'ok' });
