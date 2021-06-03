import { IEmailValidator } from '../presentation/protocols/IEmailValidator';

export class EmailValidatorAdapter implements IEmailValidator {
  isValid(email: string): Promise<boolean> {
    return new Promise((resolve) => resolve(false));
  }
}
