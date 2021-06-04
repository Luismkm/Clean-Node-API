import { DbCreateAccount } from './DbCreateAccount';
import {
  IEncrypter,
  ICreateAccountDTO,
  IAccount,
  ICreateAccountRepository,
} from './DbCreateAccountProtocols';

class EncrypterStub implements IEncrypter {
  async encrypt(value: string): Promise<string> {
    return new Promise((resolve) => resolve('hashed_password'));
  }
}

class CreateAccountRepositoryStub implements ICreateAccountRepository {
  async create(account: ICreateAccountDTO): Promise<IAccount> {
    const fakeAccount = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
    };
    return new Promise((resolve) => resolve(fakeAccount));
  }
}

let sut: DbCreateAccount;
let encrypterStub: EncrypterStub;
let createAccountRepositoryStub: CreateAccountRepositoryStub;

describe('DbCreateAccount Usecase', () => {
  beforeEach(() => {
    encrypterStub = new EncrypterStub();
    createAccountRepositoryStub = new CreateAccountRepositoryStub();
    sut = new DbCreateAccount(encrypterStub, createAccountRepositoryStub);
  });

  it('Should call Encrypter with correct password', async () => {
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    };
    await sut.create(accountData);
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });

  it('Should throw if Encrypter throws', async () => {
    jest
      .spyOn(encrypterStub, 'encrypt')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    };
    const promise = sut.create(accountData);
    await expect(promise).rejects.toThrow();
  });

  it('Should call CreateAccountRepository with correct values', async () => {
    const createSpy = jest.spyOn(createAccountRepositoryStub, 'create');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    };
    await sut.create(accountData);
    expect(createSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
    });
  });

  it('Should throw if Encrypter throws', async () => {
    jest
      .spyOn(createAccountRepositoryStub, 'create')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const accountData = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password',
    };
    const promise = sut.create(accountData);
    await expect(promise).rejects.toThrow();
  });
});
