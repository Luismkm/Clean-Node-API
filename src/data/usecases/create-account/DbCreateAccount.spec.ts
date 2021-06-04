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
});
