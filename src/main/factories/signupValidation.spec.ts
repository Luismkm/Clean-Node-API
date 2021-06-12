import { RequiredFieldValidation } from '../../presentation/helpers/validators/RequiredFieldValidation';
import { ValidationComposite } from '../../presentation/helpers/validators/ValidationComposite';
import { makeSignUpValidation } from './signupValidation';
import { CompareFieldsValidation } from '../../presentation/helpers/validators/CompareFieldsValidation';

import { IValidation } from '../../presentation/helpers/validators/IValidation';

jest.mock('../../presentation/helpers/validators/ValidationComposite');

describe('SignUpValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation();
    const validations: IValidation[] = [];
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field));
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'));
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
