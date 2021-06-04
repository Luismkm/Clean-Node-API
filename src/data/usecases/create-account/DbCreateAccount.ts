import {
  IAccount, ICreateAccount, ICreateAccountDTO, IEncrypter,
} from './DbCreateAccountProtocols';

export class DbCreateAccount implements ICreateAccount {
  private readonly encrypter: IEncrypter

  constructor(encrypter: IEncrypter) {
    this.encrypter = encrypter;
  }

  async create(account: ICreateAccountDTO): Promise<IAccount> {
    await this.encrypter.encrypt(account.password);
    return new Promise((resolve) => resolve(null));
  }
}
