import { ILoadAccountByToken } from '../../../domain/usecases/ILoadAccountByToken';
import { IDecrypter } from '../../protocols/criptography/IDecrypter';
import { IAccount } from '../authentication/DbAuthenticationProtocols';

export class DbLoadAccountByToken implements ILoadAccountByToken {
  constructor(private readonly decrypter: IDecrypter) {}

  load(accessToken: string, role?: string): Promise<IAccount> {
    this.decrypter.decrypt(accessToken);
    return null;
  }
}
