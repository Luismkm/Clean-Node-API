import { mockAccount } from '../../domain/test';
import { IAuthentication, IAuthenticationDTO } from '../../domain/usecases/account/IAuthentication';
import { ILoadAccountByToken } from '../../domain/usecases/account/ILoadAccountByToken';
import { IAccount, ICreateAccount, ICreateAccountDTO } from '../controllers/login/signup/signupProtocols';

export const mockCreateAccount = (): ICreateAccount => {
  class CreateAccountStub implements ICreateAccount {
    async create(account: ICreateAccountDTO): Promise<IAccount> {
      return new Promise((resolve) => resolve(mockAccount()));
    }
  }
  return new CreateAccountStub();
};

export const mockAuthentication = (): IAuthentication => {
  class AuthenticationStub implements IAuthentication {
    async auth(authentication: IAuthenticationDTO): Promise<string> {
      return new Promise((resolve) => resolve('any_token'));
    }
  }
  return new AuthenticationStub();
};

export const mockLoadAccountByToken = (): ILoadAccountByToken => {
  class LoadAccountByTokenStub implements ILoadAccountByToken {
    async load(accessToken: string, role?: string): Promise<IAccount> {
      return new Promise((resolve) => resolve(mockAccount()));
    }
  }
  return new LoadAccountByTokenStub();
};
