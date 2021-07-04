import { mockAccount } from '../../domain/test';
import { ICreateAccountRepository } from '../protocols/db/account/ICreateAccountRepository';
import { ILoadAccountByEmailRepository } from '../protocols/db/account/ILoadAccountByEmailRepository';
import { ILoadAccountByTokenRepository } from '../protocols/db/account/ILoadAccountByTokenRepository';
import { IUpdateAccessTokenRepository } from '../protocols/db/account/IUpdateAccessTokenRepository';
import { IAccount, ICreateAccountDTO } from '../usecases/account/create-account/DbCreateAccountProtocols';

export const mockCreateAccountRepository = (): ICreateAccountRepository => {
  class CreateAccountRepositoryStub implements ICreateAccountRepository {
    async create(account: ICreateAccountDTO): Promise<IAccount> {
      return Promise.resolve(mockAccount());
    }
  }
  return new CreateAccountRepositoryStub();
};

export const mockLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
    async loadByEmail(email: string): Promise<IAccount> {
      return Promise.resolve(mockAccount());
    }
  }
  return new LoadAccountByEmailRepositoryStub();
};

export const mockLoadAccountByTokenRepository = (): ILoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements ILoadAccountByTokenRepository {
    async loadByToken(token: string, role?: string): Promise<IAccount> {
      return Promise.resolve(mockAccount());
    }
  }
  return new LoadAccountByTokenRepositoryStub();
};

export const mockUpdateAccessTokenRepository = (): IUpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements IUpdateAccessTokenRepository {
    async updateAccessToken(id: string, token: string): Promise<void> {
      return Promise.resolve();
    }
  }
  return new UpdateAccessTokenRepositoryStub();
};
