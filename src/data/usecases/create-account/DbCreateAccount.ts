import {
  IAccount, ICreateAccount, ICreateAccountDTO, ICreateAccountRepository, IHasher,
} from './DbCreateAccountProtocols';

export class DbCreateAccount implements ICreateAccount {
  private readonly hasher: IHasher;

  private readonly createAccountRepository: ICreateAccountRepository;

  constructor(hasher: IHasher, createAccountRepository: ICreateAccountRepository) {
    this.hasher = hasher;
    this.createAccountRepository = createAccountRepository;
  }

  async create(account: ICreateAccountDTO): Promise<IAccount> {
    const hashedPassword = await this.hasher.hash(account.password);
    const accountCreated = await this.createAccountRepository.create(
      { ...account, password: hashedPassword },
    );
    return accountCreated;
  }
}
