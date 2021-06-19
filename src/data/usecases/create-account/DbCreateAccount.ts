import { ICreateAccountRepository } from '../../protocols/db/account/ICreateAccountRepository';
import { ILoadAccountByEmailRepository } from '../../protocols/db/account/ILoadAccountByEmailRepository';
import {
  IAccount,
  ICreateAccount,
  ICreateAccountDTO,
  IHasher,
} from './DbCreateAccountProtocols';

export class DbCreateAccount implements ICreateAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly createAccountRepository: ICreateAccountRepository,
    private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository,
  ) {}

  async create(account: ICreateAccountDTO): Promise<IAccount> {
    const checkUserExists = await this.loadAccountByEmailRepository.loadByEmail(account.email);
    if (!checkUserExists) {
      const hashedPassword = await this.hasher.hash(account.password);
      const accountCreated = await this.createAccountRepository.create(
        { ...account, password: hashedPassword },
      );
      return accountCreated;
    }
    return null;
  }
}
