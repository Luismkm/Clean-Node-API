import jwt from 'jsonwebtoken';

import { IEncrypter } from '../../../data/protocols/criptography/IEncrypter';

export class JwtAdapter implements IEncrypter {
  private readonly secret: string

  constructor(secret: string) {
    this.secret = secret;
  }

  encrypt(value: string): string {
    const accesToken = jwt.sign({ id: value }, this.secret);
    return accesToken;
  }
}