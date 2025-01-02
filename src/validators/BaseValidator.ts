export class BaseValidator {
  public static validator = require('validator');
  public static schema: Record<string, (value: string) => boolean>;

  public static validate<Data>(data: Data): { isValid: boolean; invalidKey?: string } {
    for (const key in this.schema) {
      if (Object.prototype.hasOwnProperty.call(this.schema, key)) {
        const validator = this.schema[key];
        const value = data[key];
        if (!validator(value)) {
          return { isValid: false, invalidKey: key };
        }
      }
    }
    return { isValid: true };
  }
}
