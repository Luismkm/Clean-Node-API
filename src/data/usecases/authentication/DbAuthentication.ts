import { IAuthentication, IAuthenticationDTO } from '../../../domain/usecases/IAuthentication';
import { IHashComparer } from '../../protocols/criptography/IHashComparer';
import { ITokenGenerator } from '../../protocols/criptography/ITokenGenerator';
import { ILoadAccountByEmailRepository } from '../../protocols/db/ILoadAccountByEmailRepository';
import { IUpdateAccessTokenRepository } from '../../protocols/db/IUpdateAccessTokenRepository';

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository

  private readonly hashCompare: IHashComparer

  private readonly tokenGenerator: ITokenGenerator

  private readonly updateAccessTokenRepository: IUpdateAccessTokenRepository

  constructor(
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    hashCompare: IHashComparer,
    tokenGenerator: ITokenGenerator,
    updateAccessTokenRepository: IUpdateAccessTokenRepository,

  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashCompare = hashCompare;
    this.tokenGenerator = tokenGenerator;
    this.updateAccessTokenRepository = updateAccessTokenRepository;
  }

  async auth(authentication: IAuthenticationDTO): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email);
    if (account) {
      const isValid = await this.hashCompare.compare(authentication.password, account.password);
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id);
        await this.updateAccessTokenRepository.update(account.id, accessToken);
        return accessToken;
      }
    }

    return null;
  }
}
