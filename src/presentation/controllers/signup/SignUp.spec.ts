import { SignUpController } from './SignUp';
import { MissingParamError, InvalidParamError, ServerError } from '../../errors';
import { success, serverError, badRequest } from '../../helpers/http-helper';

import {
  IEmailValidator,
  IAccount,
  ICreateAccountDTO,
  ICreateAccount,
  IHttpRequest,
  IValidation,
} from './signupProtocols';

const makeFakeAccount = (): IAccount => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
});

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }
  return new EmailValidatorStub();
};

const makeCreateAccount = (): ICreateAccount => {
  class CreateAccountStub implements ICreateAccount {
    async create(account: ICreateAccountDTO): Promise<IAccount> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }
  return new CreateAccountStub();
};

const makeValidation = (): IValidation => {
  class ValidationStub implements IValidation {
    validate(input: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};

interface ISutTypes {
  sut: SignUpController
  emailValidatorStub: IEmailValidator
  createAccountStub: ICreateAccount
  validationStub: IValidation
}

const makeSut = (): ISutTypes => {
  const emailValidatorStub = makeEmailValidator();
  const createAccountStub = makeCreateAccount();
  const validationStub = makeValidation();

  const sut = new SignUpController(emailValidatorStub, createAccountStub, validationStub);
  return {
    sut,
    emailValidatorStub,
    createAccountStub,
    validationStub,
  };
};

describe('SignUp Controller', () => {
  it('Should return 400 if password confirmation fails', async () => {
    const { sut } = makeSut();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'invalid_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('passwordConfirmation')));
  });

  it('Should return 400 if a invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest
      .spyOn(emailValidatorStub, 'isValid')
      .mockReturnValueOnce(false);

    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')));
  });

  it('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut();
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid');
    await sut.handle(makeFakeRequest());
    expect(isValidSpy).toHaveBeenCalledWith('any_email');
  });

  it('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut();
    jest.spyOn(emailValidatorStub, 'isValid')
      .mockImplementationOnce(() => { throw new Error(); });
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  it('Should return 500 if CreateAccount throws', async () => {
    const { sut, createAccountStub } = makeSut();
    jest.spyOn(createAccountStub, 'create')
      .mockImplementationOnce(() => { throw new Error(); });
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new ServerError(null)));
  });

  it('Should call AddAccount with correct values', async () => {
    const { sut, createAccountStub } = makeSut();
    const createSpy = jest.spyOn(createAccountStub, 'create');
    await sut.handle(makeFakeRequest());
    expect(createSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });
  });

  it('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(success(makeFakeAccount()));
  });

  it('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  it('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')));
  });
});
