import { ValidationComposite } from './ValidationComposite';
import { MissingParamError } from '../../presentation/errors';

import { IValidation } from '../../presentation/protocols';

type ISutTypes = {
  sut: ValidationComposite
  validationStubs: IValidation[]
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
  const validationStubs = [
    makeValidation(),
    makeValidation(),
  ];
  const sut = new ValidationComposite(validationStubs);
  return {
    sut,
    validationStubs,
  };
};

describe('Validation Composite', () => {
  it('Should return an error if any validation fails', () => {
    const { sut, validationStubs } = makeSut();
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('field'));
    const error = sut.validate({ field: 'any_value' });
    expect(error).toEqual(new MissingParamError('field'));
  });

  it('Should return the first error if more then one validation fails', () => {
    const { sut, validationStubs } = makeSut();
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error());
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'));
    const error = sut.validate({ field: 'any_value' });
    expect(error).toEqual(new Error());
  });

  it('Should not return if validation succeeds', () => {
    const { sut } = makeSut();
    const error = sut.validate({ field: 'any_value' });
    expect(error).toBeFalsy();
  });
});
