import { ValidationComposite } from '../../../../presentation/helpers/validators/ValidationComposite';
import { RequiredFieldValidation } from '../../../../presentation/helpers/validators/RequiredFieldValidation';
import { EmailValidatorAdapter } from '../../../../utils/EmailValidatorAdapter';
import { EmailValidation } from '../../../../presentation/helpers/validators/EmailValidation';

import { IValidation } from '../../../../presentation/helpers/validators/IValidation';

export const makeLoginValidation = (): ValidationComposite => {
  const validations: IValidation[] = [];
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field));
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()));
  return new ValidationComposite(validations);
};
