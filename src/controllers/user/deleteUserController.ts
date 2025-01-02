import { Request, Response } from 'express';
import { UserModel } from 'src/models/UserModel';
import { SessionService } from 'src/services/SessionService';

export const deleteUserController = async (req: Request, res: Response) => {
  const user_id = req.user.id;

  const sessionServiceResponse = await SessionService.del(user_id);

  if (!sessionServiceResponse.success) {
    return res.sendStatus(500);
  }

  try {
    await UserModel.delete(user_id);
    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
};
