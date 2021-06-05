import bcrypt from 'bcrypt';
import { BcryptAdapter } from './BcryptAdapter';

let sut: BcryptAdapter;
const salt = 12;

describe('Bcrypt Adapter', () => {
  beforeEach(() => {
    sut = new BcryptAdapter(salt);
  });

  test('should call bcrypt with correct value', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });
});
