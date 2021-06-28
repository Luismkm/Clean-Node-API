import { DbCreateAccount } from './DbCreateAccount';
import { mockAccount, mockAccountDTO, throwError } from '../../../../domain/test';

import { ICreateAccountRepository } from '../../../protocols/db/account/ICreateAccountRepository';
import {
  IHasher,
  ICreateAccountDTO,
  IAccount,
} from './DbCreateAccountProtocols';
import { ILoadAccountByEmailRepository } from '../../../protocols/db/account/ILoadAccountByEmailRepository';

const makeHasher = (): IHasher => {
  class HasherStub implements IHasher {
    async hash(value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'));
    }
  }
  return new HasherStub();
};

const makeCreateAccountRepository = (): ICreateAccountRepository => {
  class CreateAccountRepositoryStub implements ICreateAccountRepository {
    async create(account: ICreateAccountDTO): Promise<IAccount> {
      return new Promise((resolve) => resolve(mockAccount()));
    }
  }
  return new CreateAccountRepositoryStub();
};

const makeLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
    async loadByEmail(email: string): Promise<IAccount> {
      return new Promise((resolve) => resolve(null));
    }
  }
  return new LoadAccountByEmailRepositoryStub();
};

type ISutTypes = {
  sut: DbCreateAccount
  hasherStub: IHasher
  createAccountRepositoryStub: ICreateAccountRepository
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
}

const makeSut = (): ISutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
  const hasherStub = makeHasher();
  const createAccountRepositoryStub = makeCreateAccountRepository();
  const sut = new DbCreateAccount(
    hasherStub,
    createAccountRepositoryStub,
    loadAccountByEmailRepositoryStub,
  );
  return {
    sut,
    hasherStub,
    createAccountRepositoryStub,
    loadAccountByEmailRepositoryStub,
  };
};

describe('DbCreateAccount Usecase', () => {
  it('Should call Hasher with correct password', async () => {
    const { sut, hasherStub } = makeSut();
    const hashSpy = jest.spyOn(hasherStub, 'hash');
    await sut.create(mockAccountDTO());
    expect(hashSpy).toHaveBeenCalledWith('any_password');
  });

  it('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut();
    jest
      .spyOn(hasherStub, 'hash')
      .mockImplementationOnce(throwError);
    const promise = sut.create(mockAccountDTO());
    await expect(promise).rejects.toThrow();
  });

  it('Should call CreateAccountRepository with correct values', async () => {
    const { sut, createAccountRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(createAccountRepositoryStub, 'create');
    await sut.create(mockAccountDTO());
    expect(createSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'hashed_password',
    });
  });

  it('Should throw if CreateAccountRepository throws', async () => {
    const { sut, createAccountRepositoryStub } = makeSut();
    jest
      .spyOn(createAccountRepositoryStub, 'create')
      .mockImplementationOnce(throwError);
    const promise = sut.create(mockAccountDTO());
    await expect(promise).rejects.toThrow();
  });

  it('Should return an account on success', async () => {
    const { sut } = makeSut();
    const account = await sut.create(mockAccountDTO());
    expect(account).toEqual(mockAccount());
  });

  it('Should return null if LoadAccountByEmailRepository not return null ', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(new Promise((resolve) => resolve(mockAccount())));
    const account = await sut.create(mockAccountDTO());
    expect(account).toBeNull();
  });

  it('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail');
    await sut.create(mockAccountDTO());
    expect(loadSpy).toHaveBeenCalledWith('any_email');
  });
});
