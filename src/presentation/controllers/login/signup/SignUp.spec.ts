import { SignUpController } from './SignUp';
import { throwError } from '../../../../domain/test';
import { EmailInUseError, MissingParamError, ServerError } from '../../../errors';
import { mockValidation } from '../../../../validation/tests';
import { mockAuthentication, mockCreateAccount } from '../../../test';
import {
  success, serverError, badRequest, forbidden,
} from '../../../helpers/http/http-helper';

import { IValidation } from '../../../protocols/IValidation';
import { ICreateAccount, IHttpRequest, IAuthentication } from './signupProtocols';

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});

type ISutTypes = {
  sut: SignUpController
  authenticationStub: IAuthentication
  createAccountStub: ICreateAccount
  validationStub: IValidation
}

const makeSut = (): ISutTypes => {
  const authenticationStub = mockAuthentication();
  const createAccountStub = mockCreateAccount();
  const validationStub = mockValidation();

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

  it('Should return 403 if CreateAccount returns null', async () => {
    const { sut, createAccountStub } = makeSut();
    jest.spyOn(createAccountStub, 'create')
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()));
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
    jest.spyOn(authenticationStub, 'auth')
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
