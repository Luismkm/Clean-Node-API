import { ValidationComposite } from '../../presentation/helpers/validators/ValidationComposite';
import { RequiredFieldValidation } from '../../presentation/helpers/validators/RequiredFieldValidation';
import { IValidation } from '../../presentation/helpers/validators/IValidation';

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: IValidation[] = [];
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
