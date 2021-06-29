import { AccessDeniedError } from '../errors';
import { forbidden, serverError, success } from '../helpers/http/http-helper';
import { mockLoadAccountByToken } from '../test';
import { AuthMiddleware } from './AuthMiddleware';

import { ILoadAccountByToken, IAccount, IHttpRequest } from './authMiddlewareProtocols';

const makeFakeRequest = (): IHttpRequest => ({
  headers: {
    'x-access-token': 'any_token',
  },
});

type ISutTypes = {
  sut: AuthMiddleware
  loadAccountByTokenStub: ILoadAccountByToken
}

const makeSut = (role?: string): ISutTypes => {
  const loadAccountByTokenStub = mockLoadAccountByToken();
  const sut = new AuthMiddleware(loadAccountByTokenStub, role);
  return {
    sut,
    loadAccountByTokenStub,
  };
};

describe('Auth Middleware', () => {
  it('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  it('Should call LoadAccountByToken if correct accessToken', async () => {
    const role = 'any_role';
    const { sut, loadAccountByTokenStub } = makeSut(role);
    const loadSpy = jest.spyOn(loadAccountByTokenStub, 'load');
    await sut.handle(makeFakeRequest());
    expect(loadSpy).toHaveBeenCalledWith('any_token', role);
  });

  it('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    jest.spyOn(loadAccountByTokenStub, 'load')
      .mockReturnValueOnce(new Promise(((resolve) => resolve(null))));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });

  it('Should return 200 if LoadAccountByToken returns ana account', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(success({ accountId: 'any_id' }));
  });

  it('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut();
    jest.spyOn(loadAccountByTokenStub, 'load')
      .mockReturnValueOnce(new Promise(((resolve, reject) => reject(new Error()))));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
