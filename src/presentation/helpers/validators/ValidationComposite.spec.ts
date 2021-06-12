import { ValidationComposite } from './ValidationComposite';
import { MissingParamError } from '../../errors/MissingParamError';

import { IValidation } from './IValidation';

interface ISutTypes {
  sut: ValidationComposite
  validationStub: IValidation
}
const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate(input: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};

const makeSut = (): ISutTypes => {
  const validationStub = makeValidation();
  const sut = new ValidationComposite([validationStub]);
  return {
    sut,
    validationStub,
  };
};

describe('Validation Composite', () => {
  it('Should return an error if any validation fails', () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('field'));
    const error = sut.validate({ field: 'any_filed' });
    expect(error).toEqual(new MissingParamError('field'));
  });
});
