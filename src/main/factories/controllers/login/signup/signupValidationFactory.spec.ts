import { makeSignUpValidation } from './signupValidationFactory';
import {
  RequiredFieldValidation,
  ValidationComposite,
  EmailValidation,
  CompareFieldsValidation,
} from '../../../../../validation/validators';

import { IEmailValidator } from '../../../../../validation/protocols/IEmailValidator';
import { IValidation } from '../../../../../presentation/protocols/IValidation';

jest.mock('../../../../../validation/validators/ValidationComposite');

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe('SignUpValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation();
    const validations: IValidation[] = [];
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
    validations.push(new EmailValidation('email', makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
