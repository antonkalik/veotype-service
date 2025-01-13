import { Request, Response } from 'express';
import { UserModel } from 'src/models/UserModel';
import bcrypt from 'bcrypt';

export const updatePasswordController = async (
  req: Request<{}, {}, { password: string }>,
  res: Response
) => {
  try {
    const { password } = req.body;
    if (!password) return res.sendStatus(400);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await UserModel.updateById(req.user.id, { password: hashedPassword });

    if (!user) return res.sendStatus(401);

    // implement the situation when no user

    return res.sendData({ id: user.id });
  } catch (error) {
    return res.sendStatus(500);
  }
};
