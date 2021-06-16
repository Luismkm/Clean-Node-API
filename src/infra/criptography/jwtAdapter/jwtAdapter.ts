import jwt from 'jsonwebtoken';

import { IEncrypter } from '../../../data/protocols/criptography/IEncrypter';

export class JwtAdapter implements IEncrypter {
  constructor(private readonly secret: string) {}

  encrypt(value: string): string {
    const accesToken = jwt.sign({ id: value }, this.secret);
    return accesToken;
  }
}
