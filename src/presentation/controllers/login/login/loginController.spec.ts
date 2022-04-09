import { LoginController } from './LoginController';
import { throwError } from '../../../../domain/test';
import { MissingParamError } from '../../../errors';
import { mockAuthentication } from '../../../test';
import { mockValidation } from '../../../../validation/tests';
import {
  badRequest, serverError, success, unauthorized,
} from '../../../helpers/http/http-helper';

import { IValidation } from '../../../protocols/IValidation';
import { IHttpRequest, IAuthentication } from './loginControllerProtocols';

type ISutTypes = {
  sut: LoginController,
  authenticationStub: IAuthentication
  validationStub: IValidation
}

const mockRequest = (): IHttpRequest => ({
  body: {
    email: 'any_email',
    password: 'any_password',
  },
});

const makeSut = (): ISutTypes => {
  const authenticationStub = mockAuthentication();
  const validationStub = mockValidation();

  const sut = new LoginController(authenticationStub, validationStub);
  return {
    sut,
    authenticationStub,
    validationStub,

  };
};

describe('Login Controller', () => {
  it('Should return 500 if Authentication throws', async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, 'auth')
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should call Authentication with correct values', async () => {
    const { sut, authenticationStub } = makeSut();
    const authSpy = jest.spyOn(authenticationStub, 'auth');
    await sut.handle(mockRequest());

    expect(authSpy).toHaveBeenCalledWith({
      email: 'any_email',
      password: 'any_password',
    });
  });

  it('Should return 401 if invalid credentials are provided', async () => {
    const { sut, authenticationStub } = makeSut();
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(Promise.resolve(null));
    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(unauthorized());
  });

  it('Should return 200 if valid credentials are provided', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(mockRequest());

    expect(httpResponse).toEqual(success({ accessToken: 'any_token' }));
  });

  it('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validateSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = mockRequest();
    await sut.handle(httpRequest);
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  it('Should return 400 if Validation returns an error', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'));
    const httpResponse = await sut.handle(mockRequest());
    expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')));
  });
});
