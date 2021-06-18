import { SignUpController } from './SignUp';
import { MissingParamError, ServerError } from '../../errors';
import { success, serverError, badRequest } from '../../helpers/http-helper';

import {
  IAccount,
  ICreateAccountDTO,
  ICreateAccount,
  IHttpRequest,
  IValidation,
  IAuthentication,
  IAuthenticationDTO,
} from './signupProtocols';

const makeFakeAccount = (): IAccount => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_pasword',
});

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});

const makeCreateAccount = (): ICreateAccount => {
  class CreateAccountStub implements ICreateAccount {
    async create(account: ICreateAccountDTO): Promise<IAccount> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }
  return new CreateAccountStub();
};

const makeAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth(authentication: IAuthenticationDTO): Promise<string> {
      return new Promise((resolve) => resolve('any_token'));
    }
  }
  return new AuthenticationStub();
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
  authenticationStub: IAuthentication
  createAccountStub: ICreateAccount
  validationStub: IValidation
}

const makeSut = (): ISutTypes => {
  const authenticationStub = makeAuthentication();
  const createAccountStub = makeCreateAccount();
  const validationStub = makeValidation();

  const sut = new SignUpController(createAccountStub, validationStub, authenticationStub);
  return {
    sut,
    createAccountStub,
    validationStub,
    authenticationStub,
  };
};

describe('SignUp Controller', () => {
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
    expect(httpResponse).toEqual(success({ accessToken: 'any_token' }));
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

  it('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth');
    await sut.handle(makeFakeRequest());
    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email',
      password: 'any_password',
    });
  });

  it('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
