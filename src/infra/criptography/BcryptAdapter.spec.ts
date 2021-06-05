import bcrypt from 'bcrypt';
import { BcryptAdapter } from './BcryptAdapter';

let sut: BcryptAdapter;
const salt = 12;

jest.spyOn(bcrypt, 'hash').mockImplementation(() => new Promise((resolve) => resolve('hash')));

describe('Bcrypt Adapter', () => {
  beforeEach(() => {
    sut = new BcryptAdapter(salt);
  });

  test('should call bcrypt with correct value', async () => {
    const hashSpy = jest.spyOn(bcrypt, 'hash');
    await sut.encrypt('any_value');
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });

  test('should return a hash on success', async () => {
    const hash = await sut.encrypt('any_value');
    expect(hash).toBe('hash');
  });
});
