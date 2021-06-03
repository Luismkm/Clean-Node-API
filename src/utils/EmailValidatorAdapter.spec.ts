import { EmailValidatorAdapter } from './EmailValidatorAdapter';

describe('EmailValidator Adapter', () => {
  it('Should return false if validator returns false', async () => {
    const sut = new EmailValidatorAdapter();
    const isValid = await sut.isValid('invalid_email@mail.com');
    expect(isValid).toBe(false);
  });
});
