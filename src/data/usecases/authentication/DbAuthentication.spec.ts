import { DbAuthentication } from './DbAuthentication';

import { IAccount } from '../../../domain/models/IAccount';
import { IAuthenticationDTO } from '../../../domain/usecases/IAuthentication';
import { ILoadAccountByEmailRepository } from '../../protocols/ILoadAccountByEmailRepository';

const makeFakeAccount = (): IAccount => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password',
});

const makeFakeAuthentication = (): IAuthenticationDTO => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

const makeLoadAccountByEmailRepository = (): ILoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
    async load(email: string): Promise<IAccount> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }
  return new LoadAccountByEmailRepositoryStub();
};

interface ISutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: ILoadAccountByEmailRepository
}

const makeSut = (): ISutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository();
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub);
  return {
    sut,
    loadAccountByEmailRepositoryStub,
  };
};

describe('DbAuthentication UseCase', () => {
  it('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut();
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load');
    await sut.auth(makeFakeAuthentication());
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
  });
});
