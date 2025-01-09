import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { UserModel } from 'src/models/UserModel';
import { SessionService } from 'src/services/SessionService';
import { TokenService } from 'src/services/TokenService';

export async function loginController(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.sendError(400, 'email already exist');
  }

  const user = await UserModel.findByEmail(email);

  if (user) {
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.sendError(400, 'invalid email or password');
    }

    const tokenServiceResponse = TokenService.sign({
      id: user.id,
      role: user.role,
    });

    if (!tokenServiceResponse.success) {
      return res.sendStatus(500);
    }

    const { token } = tokenServiceResponse.data;

    console.log('[TOKEN LOGIN]', token);

    const sessionServiceResponse = await SessionService.set(user.id, token);

    if (!sessionServiceResponse.success) {
      return res.sendStatus(500);
    }

    res.sendData({
      data: { token },
    });
  } else {
    return res.sendError(400, 'invalid email or password');
  }
}
