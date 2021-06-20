import { makeLoginValidation } from './loginValidationFactory';
import {
  RequiredFieldValidation,
  ValidationComposite,
  EmailValidation,
} from '../../../../validation/validators';

import { IValidation } from '../../../../presentation/protocols/IValidation';
import { IEmailValidator } from '../../../../validation/protocols/IEmailValidator';

jest.mock('../../../../validation/validators/ValidationComposite');

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

describe('LoginValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeLoginValidation();
    const validations: IValidation[] = [];
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new EmailValidation('email', makeEmailValidator()));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
