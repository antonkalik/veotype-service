import bcrypt from 'bcrypt';
import { UserModel } from 'src/models/UserModel';
import { getRandomString } from 'src/utils/getRandomString';
import { TokenService } from 'src/services/TokenService';
import { SessionService } from 'src/services/SessionService';
import { SignUpPayload } from 'src/@types';
import { Service, ServiceResponse } from 'src/services/Service';
import { SignUpValidator } from 'src/validators/SignUpValidator';

export class SignUpService {
  public static async sign({
    email,
    password,
  }: SignUpPayload): Promise<ServiceResponse<{ token: string }>> {
    const validation = SignUpValidator.validate<{
      email: string;
      password: string;
    }>({ email, password });

    if (!validation.isValid) {
      return Service.error(`Invalid ${validation.invalidKey}`, 400);
    }

    const user = await UserModel.findOneBy({ email });

    if (user) {
      return Service.error('Invalid email or password', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const username = `${email.split('@')[0]}${getRandomString(5)}`;
    const createdUser = await UserModel.create({
      email,
      password: hashedPassword,
      username,
    });
    const tokenServiceResponse = TokenService.sign({
      id: createdUser.id,
    });

    if (!tokenServiceResponse.success) {
      return tokenServiceResponse;
    }

    const { token } = tokenServiceResponse.data;
    const sessionServiceResponse = await SessionService.set(createdUser.id, token);

    if (!sessionServiceResponse.success) {
      return sessionServiceResponse;
    }

    return Service.success({ token });
  }
}
