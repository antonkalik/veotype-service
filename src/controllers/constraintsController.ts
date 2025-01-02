import { Request, Response } from 'express';
import { countries } from 'src/constants/countries';
import { languages } from 'src/constants/languages';

export const constraintsController = (_: Request, res: Response) =>
  res.sendData({
    data: { countries, languages },
  });
