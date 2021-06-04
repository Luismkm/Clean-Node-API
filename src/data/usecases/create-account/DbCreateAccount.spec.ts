import { DbCreateAccount } from './DbCreateAccount';

let sut: DbCreateAccount;
let encrypterStub;

class EncrypterStub {
  async encrypt(value: string): Promise<string> {
    return new Promise((resolve) => resolve('hashed_password'));
  }
}

describe('DbCreateAccount Usecase', () => {
  beforeEach(() => {
    encrypterStub = new EncrypterStub();
    sut = new DbCreateAccount(encrypterStub);
  });

  it('Should call Encrypter with correct passowrd', async () => {
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
});
