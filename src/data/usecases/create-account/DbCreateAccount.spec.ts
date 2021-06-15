import { DbCreateAccount } from './DbCreateAccount';
import {
  IHasher,
  ICreateAccountDTO,
  IAccount,
  ICreateAccountRepository,
} from './DbCreateAccountProtocols';

class HasherStub implements IHasher {
  async hash(value: string): Promise<string> {
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
let hasherStub: HasherStub;
let createAccountRepositoryStub: CreateAccountRepositoryStub;

const makeFakeAccountDTO = (): ICreateAccountDTO => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password',
});

describe('DbCreateAccount Usecase', () => {
  beforeEach(() => {
    hasherStub = new HasherStub();
    createAccountRepositoryStub = new CreateAccountRepositoryStub();
    sut = new DbCreateAccount(hasherStub, createAccountRepositoryStub);
  });

  it('Should call Hasher with correct password', async () => {
    const hashSpy = jest.spyOn(hasherStub, 'hash');
    await sut.create(makeFakeAccountDTO());

    expect(hashSpy).toHaveBeenCalledWith('valid_password');
  });

  it('Should throw if Hasher throws', async () => {
    jest
      .spyOn(hasherStub, 'hash')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const promise = sut.create(makeFakeAccountDTO());

    await expect(promise).rejects.toThrow();
  });

  it('Should call CreateAccountRepository with correct values', async () => {
    const createSpy = jest.spyOn(createAccountRepositoryStub, 'create');
    await sut.create(makeFakeAccountDTO());

    expect(createSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
    });
  });

  it('Should throw if CreateAccountRepository throws', async () => {
    jest
      .spyOn(createAccountRepositoryStub, 'create')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const promise = sut.create(makeFakeAccountDTO());

    await expect(promise).rejects.toThrow();
  });

  it('Should return an account on success', async () => {
    const account = await sut.create(makeFakeAccountDTO());

    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password',
    });
  });
});
