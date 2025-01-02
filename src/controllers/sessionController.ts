import { Request, Response } from 'express';
import { UserModel } from 'src/models/UserModel';
import type { User } from 'src/@types';

export const sessionController = async (req: Request, res: Response) => {
  if (!req.user) return res.sendStatus(401);

  try {
    const user = await UserModel.findOneById<User>(req.user.id);

    if (user) {
      return res.sendData({
        data: {
          ...user,
          languages: JSON.parse(user.languages),
        },
      });
    } else {
      return res.sendStatus(401);
    }
  } catch (error) {
    console.error('[SESSION ERROR]', error);
    return res.sendStatus(500);
  }
};
