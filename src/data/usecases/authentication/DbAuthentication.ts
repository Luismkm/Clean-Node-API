import {
  IAuthenticationDTO,
  ILoadAccountByEmailRepository,
  IHashComparer,
  IUpdateAccessTokenRepository,
  IAuthentication,
  IEncrypter,
} from './DbAuthenticationProtocols';

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository

  private readonly hashCompare: IHashComparer

  private readonly encrypter: IEncrypter

  private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository

  constructor(
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    hashCompare: IHashComparer,
    encrypter: IEncrypter,
    updateAccessTokenRepository: IUpdateAccessTokenRepository,

  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashCompare = hashCompare;
    this.encrypter = encrypter;
    this.updateAccessTokenRepository = updateAccessTokenRepository;
  }

  async auth(authentication: IAuthenticationDTO): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email);
    if (account) {
      const isValid = await this.hashCompare.compare(authentication.password, account.password);
      if (isValid) {
        const accessToken = await this.encrypter.encrypt(account.id);
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken);
        return accessToken;
      }
    }

    return null;
  }
}
