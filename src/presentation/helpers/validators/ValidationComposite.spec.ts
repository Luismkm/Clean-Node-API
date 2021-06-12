import { ValidationComposite } from './ValidationComposite';
import { MissingParamError } from '../../errors/MissingParamError';

import { IValidation } from './IValidation';

describe('Validation Composite', () => {
  it('Should return an error if any validation fails', () => {
    class ValidationStub implements IValidation {
      validate(input: any): Error {
        return new MissingParamError('field');
      }
    }
    const validatorStub = new ValidationStub();
    const sut = new ValidationComposite([validatorStub]);
    const error = sut.validate({ field: 'any_filed' });
    expect(error).toEqual(new MissingParamError('field'));
  });
});
