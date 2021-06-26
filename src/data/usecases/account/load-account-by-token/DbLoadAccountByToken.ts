import {
  ILoadAccountByToken,
  IDecrypter,
  ILoadAccountByTokenRepository,
  IAccount,
} from './DbLoadAccountByTokenProtocols';

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor(
    private readonly decrypter: IDecrypter,
    private readonly loadAccountByTokenRepository: ILoadAccountByTokenRepository,
  ) {}

  async load(accessToken: string, role?: string): Promise<IAccount> {
    const token = this.decrypter.decrypt(accessToken);
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role);
      if (account) {
        return account;
      }
    }
    return null;
  }
}
