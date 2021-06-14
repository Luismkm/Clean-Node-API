import { EmailValidation } from './EmailValidation';
import { InvalidParamError } from '../../errors';

import { IEmailValidator } from '../../protocols/IEmailValidator';

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

interface ISutTypes {
  sut: EmailValidation
  emailValidatorStub: IEmailValidator
}

const makeSut = (): ISutTypes => {
  const emailValidatorStub = makeEmailValidator();

  const sut = new EmailValidation('email', emailValidatorStub);
  return {
    sut,
    emailValidatorStub,
  };
};

describe('Email Validation', () => {
  it('Should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest
      .spyOn(emailValidatorStub, 'isValid')
      .mockReturnValueOnce(false);

    const error = sut.validate({ email: 'any_email' });
    expect(error).toEqual(new InvalidParamError('email'));
  });

  it('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    sut.validate({ email: 'any_email' });
    expect(isValidSpy).toHaveBeenCalledWith('any_email');
  });

  it('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error();
    });
    expect(sut.validate).toThrow();
  });
});