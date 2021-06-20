import { ValidationComposite } from '../../../../presentation/helpers/validators/ValidationComposite';
import { RequiredFieldValidation } from '../../../../presentation/helpers/validators/RequiredFieldValidation';
import { EmailValidation } from '../../../../presentation/helpers/validators/EmailValidation';
import { EmailValidatorAdapter } from '../../../adapter/validators/EmailValidatorAdapter';

import { IValidation } from '../../../../presentation/protocols/IValidation';

export const makeLoginValidation = (): ValidationComposite => {
  const validations: IValidation[] = [];
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
