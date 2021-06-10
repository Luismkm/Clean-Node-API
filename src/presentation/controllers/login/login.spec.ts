import { LoginController } from './login';
import { badRequest } from '../../helpers/http-helper';
import { MissingParamError } from '../../errors';

describe('Login Controller', () => {
  const makeSut = (): any => {
    const sut = new LoginController();
    return sut;
  };

  it('Should return 400 if no email is provided', async () => {
    const sut = makeSut();
    const httpRequest = {
      body: {
        password: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')));
  });
});
