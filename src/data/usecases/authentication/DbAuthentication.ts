import { IAuthentication, IAuthenticationDTO } from '../../../domain/usecases/IAuthentication';
import { IHashComparer } from '../../protocols/criptography/IHashComparer';
import { ILoadAccountByEmailRepository } from '../../protocols/db/ILoadAccountByEmailRepository';

export class DbAuthentication implements IAuthentication {
  private readonly loadAccountByEmailRepository: ILoadAccountByEmailRepository

  private readonly hashCompare: IHashComparer

  constructor(
    loadAccountByEmailRepository: ILoadAccountByEmailRepository,
    hashCompare: IHashComparer,
  ) {
    this.loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.hashCompare = hashCompare;
  }

  async auth(authentication: IAuthenticationDTO): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email);
    if (account) {
      await this.hashCompare.compare(authentication.password, account.password);
    }

    return null;
  }
}
