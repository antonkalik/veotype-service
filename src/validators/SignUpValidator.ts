import { BaseValidator } from './BaseValidator';

export class SignUpValidator extends BaseValidator {
  public static schema = {
    email: this.validator.isEmail,
    password: (str: string) => this.validator.isLength(str, { min: 6 }),
  };
}
