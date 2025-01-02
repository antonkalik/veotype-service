import * as dotenv from 'dotenv';
import jsonwebtoken, { SignOptions } from 'jsonwebtoken';
import { Service, ServiceResponse } from 'src/services/Service';

dotenv.config();

export class TokenService {
  private static jwt_secret: string = process.env.JWT_SECRET!;

  static initialize = () => {
    if (!this.jwt_secret) {
      throw new Error('JWT secret not found in environment variables!');
    }
  };

  public static verify = <Result>(token: string): Promise<ServiceResponse<Result>> =>
    new Promise(resolve => {
      jsonwebtoken.verify(token, this.jwt_secret, (error, decoded) => {
        if (error) {
          resolve(Service.error(error.message, 400));
        } else {
          resolve(Service.success(decoded as Result));
        }
      });
    });

  public static sign = (
    payload: string | object | Buffer,
    options: SignOptions = {}
  ): ServiceResponse<{ token: string }> => {
    try {
      const token = jsonwebtoken.sign(payload, this.jwt_secret, options);
      return Service.success<{ token: string }>({ token });
    } catch (error) {
      return Service.error(error.message, 500);
    }
  };
}
