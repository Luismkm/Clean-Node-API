import { DbLoadAccountByToken } from './DbLoadAccountByToken';
import { mockDecrypter } from '../../../tests';
import { throwError, mockAccount } from '../../../../domain/test';

import { IDecrypter } from '../../../protocols/criptography/IDecrypter';
import { ILoadAccountByTokenRepository } from '../../../protocols/db/account/ILoadAccountByTokenRepository';
import { IAccount } from '../create-account/DbCreateAccountProtocols';

type ISutTypes = {
  sut: DbLoadAccountByToken
  decrypterStub: IDecrypter
  loadAccountByEmailRepositoryStub: ILoadAccountByTokenRepository
}

const makeLoadAccountByTokenRepository = (): ILoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements ILoadAccountByTokenRepository {
    async loadByToken(token: string, role?: string): Promise<IAccount> {
      return new Promise((resolve) => resolve(mockAccount()));
    }
  }
  return new LoadAccountByTokenRepositoryStub();
};

const makeSut = (): ISutTypes => {
  const decrypterStub = mockDecrypter();
  const loadAccountByEmailRepositoryStub = makeLoadAccountByTokenRepository();
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByEmailRepositoryStub);
  return {
    sut,
    decrypterStub,
    loadAccountByEmailRepositoryStub,
  };
};

describe('DbLoadAccountByToken Usecase', () => {
  it('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');
    await sut.load('any_token', 'any_role');
    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });

  it('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut();
    jest.spyOn(decrypterStub, 'decrypt')
      .mockReturnValueOnce(null);
    const account = await sut.load('any_token', 'any_role');
    expect(account).toBeNull();
  });

  it('Should call LoadAccountByEmailRepository with correct values', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadByTokenSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByToken')
      .mockReturnValueOnce(null);
    await sut.load('any_token', 'any_role');
    expect(loadByTokenSpy).toHaveBeenCalledWith('any_token', 'any_role');
  });

  it('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByToken')
      .mockReturnValueOnce(null);
    const account = await sut.load('any_token', 'any_role');
    expect(account).toBeNull();
  });

  it('Should return an account on success', async () => {
    const { sut } = makeSut();
    const account = await sut.load('any_token', 'any_role');
    expect(account).toEqual(mockAccount());
  });

  it('Should throw if Decrypter throws', () => {
    const { sut, decrypterStub } = makeSut();
    jest.spyOn(decrypterStub, 'decrypt')
      .mockImplementationOnce(() => { throw new Error(); });
    const returnValue = sut.load('any_token', 'any_role');
    expect(returnValue).rejects.toThrow();
  });

  it('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByToken')
      .mockImplementationOnce(throwError);
    const promise = sut.load('any_token', 'any_role');
    await expect(promise).rejects.toThrow();
  });
});
