import { EmailValidatorAdapter } from '../../../../../infra/validators/EmailValidatorAdapter';
import {
  RequiredFieldValidation,
  ValidationComposite,
  EmailValidation,
} from '../../../../../validation/validators';

import { IValidation } from '../../../../../presentation/protocols/IValidation';

export const makeCreateSurveyValidation = (): ValidationComposite => {
  const validations: IValidation[] = [];
  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFieldValidation(field));
  }
  return new ValidationComposite(validations);
};
