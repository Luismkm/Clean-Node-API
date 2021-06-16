import { ICreateAccountRepository } from '../../protocols/db/account/ICreateAccountRepository';
import {
  IAccount, ICreateAccount, ICreateAccountDTO, IHasher,
} from './DbCreateAccountProtocols';

export class DbCreateAccount implements ICreateAccount {
  constructor(
    private readonly hasher: IHasher,
    private readonly createAccountRepository: ICreateAccountRepository,
  ) {}

  async create(account: ICreateAccountDTO): Promise<IAccount> {
    const hashedPassword = await this.hasher.hash(account.password);
    const accountCreated = await this.createAccountRepository.create(
      { ...account, password: hashedPassword },
    );
    return accountCreated;
  }
}
