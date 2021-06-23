import jwt from 'jsonwebtoken';
import { IDecrypter } from '../../../data/protocols/criptography/IDecrypter';

import { IEncrypter } from '../../../data/protocols/criptography/IEncrypter';

export class JwtAdapter implements IEncrypter, IDecrypter {
  constructor(private readonly secret: string) {}

  encrypt(value: string): string {
    const accesToken = jwt.sign({ id: value }, this.secret);
    return accesToken;
  }

  decrypt(token: string): string {
    const value: any = jwt.verify(token, this.secret);
    return value;
  }
}
