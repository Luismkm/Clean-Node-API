import { IAccount } from '../../../domain/models/IAccount';
import { ILoadAccountByEmailRepository } from '../../protocols/ILoadAccountByEmailRepository';
import { DbAuthentication } from './DbAuthentication';

describe('DbAuthentication UseCase', () => {
  it('Should call LoadAccountByEmailRepository with correct email', async () => {
    class LoadAccountByEmailRepositoryStub implements ILoadAccountByEmailRepository {
      async load(email: string): Promise<IAccount> {
        const account: IAccount = {
          id: 'any_id',
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
        };
        return new Promise((resolve) => resolve(account));
      }
    }
    const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub();
    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub);
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load');
    await sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password',
    });
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
  });
});
