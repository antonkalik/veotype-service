import { Request, Response } from 'express';
import { UserModel } from 'src/models/UserModel';
import { TokenService } from 'src/services/TokenService';
import { EmailService } from 'src/services/EmailService';

export const forgotPasswordController = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.sendStatus(400);
    }

    const user = await UserModel.findByEmail(email);

    if (user) {
      const tokenServiceResponse = TokenService.sign(
        {
          id: user.id,
        },
        {
          expiresIn: '1 day',
        }
      );

      if (!tokenServiceResponse.success) {
        return res.sendStatus(400);
      }

      const token = tokenServiceResponse.data.token;

      await user.context.update({ forgot_password_token: token });
      const emailServiceResponse = await EmailService.sendPasswordResetEmail(email, token);

      if (!emailServiceResponse.success) {
        return res.sendStatus(500);
      }

      console.log('Message sent: %s', emailServiceResponse.data.messageId);
    }

    return res.sendStatus(200);
  } catch (error) {
    return res.sendStatus(500);
  }
};
