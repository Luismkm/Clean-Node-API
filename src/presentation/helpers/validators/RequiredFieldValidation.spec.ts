import { MissingParamError } from '../../errors/MissingParamError';
import { RequiredFieldValidation } from './RequiredFieldValidation';

describe('RequiredField Validation', () => {
  it('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldValidation('field');
    const error = sut.validate({ name: 'any_name' });
    expect(error).toEqual(new MissingParamError('field'));
  });
});
