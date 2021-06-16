import { makeLoginValidation } from './loginValidationFactory';
import { RequiredFieldValidation } from '../../../presentation/helpers/validators/RequiredFieldValidation';
import { ValidationComposite } from '../../../presentation/helpers/validators/ValidationComposite';
import { EmailValidation } from '../../../presentation/helpers/validators/EmailValidation';

import { IValidation } from '../../../presentation/helpers/validators/IValidation';
import { IEmailValidator } from '../../../presentation/protocols/IEmailValidator';

jest.mock('../../../presentation/helpers/validators/ValidationComposite');

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
