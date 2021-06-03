import validator from 'validator';
import { EmailValidatorAdapter } from './EmailValidatorAdapter';

describe('EmailValidator Adapter', () => {
  it('Should return false if validator returns false', async () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);

    const sut = new EmailValidatorAdapter();
    const isValid = await sut.isValid('invalid_email@mail.com');
    expect(isValid).toBe(false);
  });

  it('Should return false if validator returns true', async () => {
    const sut = new EmailValidatorAdapter();
    const isValid = await sut.isValid('valid_email@mail.com');
    expect(isValid).toBe(true);
  });
});
