import { IDecrypter } from '../protocols/criptography/IDecrypter';
import { IEncrypter } from '../protocols/criptography/IEncrypter';
import { IHashComparer } from '../protocols/criptography/IHashComparer';
import { IHasher } from '../protocols/criptography/IHasher';

export const mockHasher = (): IHasher => {
  class HasherStub implements IHasher {
    async hash(value: string): Promise<string> {
      return new Promise((resolve) => resolve('hashed_password'));
    }
  }
  return new HasherStub();
};

export const mockDecrypter = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    decrypt(value: string): string {
      return 'any_value';
    }
  }
  return new DecrypterStub();
};

export const mockEncrypter = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    encrypt(value: string): string {
      return 'any_token';
    }
  }
  return new EncrypterStub();
};

export const mockHashCompare = (): IHashComparer => {
  class HashCompareStub implements IHashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }
  return new HashCompareStub();
};
