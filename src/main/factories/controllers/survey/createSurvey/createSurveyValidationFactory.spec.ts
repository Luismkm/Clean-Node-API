import { makeCreateSurveyController } from './createSurveyControllerFactory';
import { RequiredFieldValidation, ValidationComposite } from '../../../../../validation/validators';

import { IValidation } from '../../../../../presentation/protocols/IValidation';

jest.mock('../../../../../validation/validators/ValidationComposite');

describe('CreateSurveyValidation Factory', () => {
  it('Should call ValidationComposite with all validations', () => {
    makeCreateSurveyController();
    const validations: IValidation[] = [];
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field));
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations);
  });
});
