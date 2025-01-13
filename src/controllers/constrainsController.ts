import { Request, Response } from 'express';
import { countries } from 'src/constants/countries';
import { locales } from 'src/constants/locales';
import { keyboardTypes } from 'src/constants/keyboardTypes';

export const constrainsController = (_: Request, res: Response) =>
  res.sendData({ countries, locales, keyboard_types: keyboardTypes });
