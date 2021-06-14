import { IAuthentication, IAuthenticationDTO } from '../../../domain/usecases/IAuthentication';
import { IHashComparer } from '../../protocols/criptography/IHashComparer';
import { ITokenGenerator } from '../../protocols/criptography/ITokenGenerator';
import { ILoadAccountByEmailRepository } from '../../protocols/db/ILoadAccountByEmailRepository';

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository

  private readonly hashCompare: IHashComparer

  private readonly tokenGenerator: ITokenGenerator

  constructor(
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    hashCompare: IHashComparer,
    tokenGenerator: ITokenGenerator,
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashCompare = hashCompare;
    this.tokenGenerator = tokenGenerator;
  }

  async auth(authentication: IAuthenticationDTO): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email);
    if (account) {
      await this.hashCompare.compare(authentication.password, account.password);
      this.tokenGenerator.generate(account.id);
    }

    return null;
  }
}
