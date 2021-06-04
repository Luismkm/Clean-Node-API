import { IAccount } from '../../../domain/models/IAccount';
import { ICreateAccount, ICreateAccountDTO } from '../../../domain/usecases/ICreateAccount';
import { IEncrypter } from '../../protocols/IEncrypter';

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
