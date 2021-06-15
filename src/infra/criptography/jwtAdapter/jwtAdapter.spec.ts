import jwt from 'jsonwebtoken';

import { JwtAdapter } from './jwtAdapter';

jest.mock('jsonwebtoken', () => ({
  sign(): string {
    return 'any_token';
  },
}));

describe('JWT Adapter', () => {
  it('Should call sign with correct values', () => {
    const sut = new JwtAdapter('secret');
    const signSpy = jest.spyOn(jwt, 'sign');
    sut.encrypt('any_id');
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
  });

  it('Should return a token sign success', () => {
    const sut = new JwtAdapter('secret');
    const signSpy = jest.spyOn(jwt, 'sign');
    sut.encrypt('any_id');
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
  });
});
