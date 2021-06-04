import {
  IAccount, ICreateAccount, ICreateAccountDTO, ICreateAccountRepository, IEncrypter,
} from './DbCreateAccountProtocols';

export class DbCreateAccount implements ICreateAccount {
  private readonly encrypter: IEncrypter;

  private readonly createAccountRepository: ICreateAccountRepository;

  constructor(encrypter: IEncrypter, createAccountRepository: ICreateAccountRepository) {
    this.encrypter = encrypter;
    this.createAccountRepository = createAccountRepository;
  }

  async create(account: ICreateAccountDTO): Promise<IAccount> {
    const hashedPassword = await this.encrypter.encrypt(account.password);
    await this.createAccountRepository.create({ ...account, password: hashedPassword });
    return new Promise((resolve) => resolve(null));
  }
}
