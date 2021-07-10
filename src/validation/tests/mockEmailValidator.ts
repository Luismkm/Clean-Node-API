import { IEmailValidator } from '../protocols/IEmailValidator';

export const mockEmailValidator = (): IEmailValidator => {
  class EmailValidationStub implements IEmailValidator {
    isValid(input: string): boolean {
      return true;
    }
  }
  return new EmailValidationStub();
};
