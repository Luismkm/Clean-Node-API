import { SignUpController } from './SignUp';
import { MissingParamError, InvalidParamError, ServerError } from '../../errors';
import {
  IEmailValidator,
  IAccount,
  ICreateAccountDTO,
  ICreateAccount,
  IHttpRequest,
} from './signupProtocols';

const makeEmailValidator = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator{

    isValid(email: string): boolean {
      return true   
    }
  }
  return new EmailValidatorStub
}

const makeCreateAccount = (): ICreateAccount => {
  class CreateAccountStub implements ICreateAccount {

    async create(account: ICreateAccountDTO): Promise<IAccount>{
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new CreateAccountStub()
}

interface ISutTypes {
  sut: SignUpController
  emailValidatorStub: IEmailValidator
  createAccountStub: ICreateAccount
}

const makeSut = (): ISutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const createAccountStub = makeCreateAccount()
  const sut = new SignUpController(emailValidatorStub, createAccountStub)
  return {
    sut,
    emailValidatorStub,
    createAccountStub
  }
}

const makeFakeAccount = (): IAccount => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email'
})

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    passwordConfirmation: 'any_password'
  }
})

describe('SignUp Controller', () => {
  it('Should return 400 if no name is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('Should return 400 if no email is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  it('Should return 400 if no password is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  it('Should return 400 if no password confirmation is provided', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'));
  });

  it('Should return 400 if password confirmation fails', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        passwordConfirmation: 'invalid_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('passwordConfirmation'));
  });

  it('Should return 400 if a invalid email is provided', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest
      .spyOn(emailValidatorStub, 'isValid')
      .mockReturnValueOnce(false);

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParamError('email'));
  });

  it('Should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()

    const isValidSpy = jest
      .spyOn(emailValidatorStub, 'isValid');

    await sut.handle(makeFakeRequest());

    expect(isValidSpy).toHaveBeenCalledWith('any_email');
  });

  it('Should return 500 if EmailValidator throws', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError(''));
  });

  it('Should return 500 if CreateAccount throws', async () => {
    const { sut, createAccountStub } = makeSut()

    jest
      .spyOn(createAccountStub, 'create')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse.statusCode).toBe(500);
    expect(httpResponse.body).toEqual(new ServerError(''));
  });

  it('Should call AddAccount with correct values', async () => {
    const { sut, createAccountStub } = makeSut()

    const createSpy = jest.spyOn(createAccountStub, 'create');
    await sut.handle(makeFakeRequest());

    expect(createSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });
  });

  it('Should return 200 if valid data is provided', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email',
    });
  });

  it('Should call Validation with correct values', async () => {
    const { sut, createAccountStub } = makeSut()

    const createSpy = jest.spyOn(createAccountStub, 'create');
    await sut.handle(makeFakeRequest());

    expect(createSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'any_password',
    });
  });
});
