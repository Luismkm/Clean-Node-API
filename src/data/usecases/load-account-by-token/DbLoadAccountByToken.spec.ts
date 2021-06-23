import { DbLoadAccountByToken } from './DbLoadAccountByToken';

import { IDecrypter } from '../../protocols/criptography/IDecrypter';
import { IAccount } from '../authentication/DbAuthenticationProtocols';
import { ILoadAccountByTokenRepository } from '../../protocols/db/account/ILoadAccountByTokenRepository';

interface ISutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: IDecrypter
  loadAccountByEmailRepositoryStub: ILoadAccountByTokenRepository
}

const makeFakeAccount = (): IAccount => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password',
});

const makeDecrypter = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    decrypt(value: string): string {
      return 'any_value';
    }
  }
  return new DecrypterStub();
};

const makeLoadAccountByTokenRepository = (): ILoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements ILoadAccountByTokenRepository {
    async loadByToken(token: string, role?: string): Promise<IAccount> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }
  return new LoadAccountByTokenRepositoryStub();
};

const makeSut = (): ISutTypes => {
  const decrypterStub = makeDecrypter();
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
    expect(account).toEqual(makeFakeAccount());
  });

  it('Should throw if Decrypter throws', () => {
    const { sut, decrypterStub } = makeSut();
    jest
      .spyOn(decrypterStub, 'decrypt')
      .mockImplementationOnce(() => { throw new Error(); });
    const returnValue = sut.load('any_token', 'any_role');
    expect(returnValue).rejects.toThrow();
  });

  it('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest
      .spyOn(loadAccountByEmailRepositoryStub, 'loadByToken')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const promise = sut.load('any_token', 'any_role');
    await expect(promise).rejects.toThrow();
  });
});
