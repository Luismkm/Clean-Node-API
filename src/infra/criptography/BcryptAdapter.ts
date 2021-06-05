import bcrypt from 'bcrypt';
import { IEncrypter } from '../../data/protocols/IEncrypter';

export class BcryptAdapter implements IEncrypter {
  private readonly salt: number

  constructor(salt: number) {
    this.salt = salt;
  }

  async encrypt(value: string): Promise<string> {
    const hash = bcrypt.hash(value, this.salt);
    return hash;
  }
}
