import jwt from 'jsonwebtoken';

import { JwtAdapter } from './jwtAdapter';

describe('JWT Adapter', () => {
  it('Should call sign with correct values', () => {
    const sut = new JwtAdapter('secret');
    const signSpy = jest.spyOn(jwt, 'sign');
    sut.encrypt('any_id');
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
  });
});
