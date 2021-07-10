import validator from 'validator';
import { EmailValidatorAdapter } from './EmailValidatorAdapter';

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true;
  },
}));

let sut: EmailValidatorAdapter;

beforeEach(() => {
  sut = new EmailValidatorAdapter();
});

describe('EmailValidator Adapter', () => {
  it('Should return false if validator returns false', () => {
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);

    const isValid = sut.isValid('invalid_email@mail.com');
    expect(isValid).toBe(false);
  });

  it('Should return true if validator returns true', () => {
    const isValid = sut.isValid('valid_email@mail.com');
    expect(isValid).toBe(true);
  });

  it('Should call validator with correct email', () => {
    const isEmailSpy = jest.spyOn(validator, 'isEmail');
    sut.isValid('valid_email@mail.com');
    expect(isEmailSpy).toHaveBeenCalledWith('valid_email@mail.com');
  });
});
