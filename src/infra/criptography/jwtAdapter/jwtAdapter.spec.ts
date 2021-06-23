import jwt from 'jsonwebtoken';

import { JwtAdapter } from './jwtAdapter';

jest.mock('jsonwebtoken', () => ({
  sign(): string {
    return 'any_token';
  },

  verify(): string {
    return 'any_value';
  },
}));

const makeSut = (): JwtAdapter => new JwtAdapter('secret');

describe('JWT Adapter', () => {
  describe('sign()', () => {
    it('Should call sign with correct values', () => {
      const sut = makeSut();
      const signSpy = jest.spyOn(jwt, 'sign');
      sut.encrypt('any_id');
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
    });

    it('Should return a token sign success', () => {
      const sut = makeSut();
      const signSpy = jest.spyOn(jwt, 'sign');
      sut.encrypt('any_id');
      expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
    });
  });

  describe('verify()', () => {
    it('Should call verify with correct values', () => {
      const sut = makeSut();
      const verifySpy = jest.spyOn(jwt, 'verify');
      sut.decrypt('any_token');
      expect(verifySpy).toHaveBeenCalledWith('any_token', 'secret');
    });

    it('Should return a value on verify success', () => {
      const sut = makeSut();
      const value = sut.decrypt('any_token');
      expect(value).toBe('any_value');
    });
  });
});
