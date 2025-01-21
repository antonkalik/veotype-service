import { Request, Response } from 'express';
import { SettingsModel } from 'src/models/SettingsModel';

export const settingsController = async (req: Request, res: Response) => {
  try {
    const settings = await SettingsModel.getByUserId(req.user.id);

    return res.sendData(settings, 200);
  } catch (error) {
    return res.sendStatus(500);
  }
};
