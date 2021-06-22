import { DbLoadAccountByToken } from './DbLoadAccountByToken';

import { IDecrypter } from '../../protocols/criptography/IDecrypter';

interface ISutTypes {
  sut: DbLoadAccountByToken
  decrypterStub: IDecrypter
}

const makeDecrypter = (): IDecrypter => {
  class DecrypterStub implements IDecrypter {
    decrypt(value: string): string {
      return 'any_value';
    }
  }
  return new DecrypterStub();
};

const makeSut = (): ISutTypes => {
  const decrypterStub = makeDecrypter();
  const sut = new DbLoadAccountByToken(decrypterStub);
  return {
    sut,
    decrypterStub,
  };
};

describe('DbLoadAccountByToken Usecase', () => {
  it('Should call Decrypter with correct values', () => {
    const { sut, decrypterStub } = makeSut();
    const decryptSpy = jest.spyOn(decrypterStub, 'decrypt');
    sut.load('any_token');
    expect(decryptSpy).toHaveBeenCalledWith('any_token');
  });
});
