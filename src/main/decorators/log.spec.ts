import { LogControllerDecorator } from './log';
import { serverError } from '../../presentation/helpers/http-helper';

import { IController, IHttpRequest, IHttpResponse } from '../../presentation/protocols';
import { ILogErrorRepository } from '../../data/protocols/ILogErrorRepository';

class ControllerStub implements IController {
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const httpResponse: IHttpResponse = {
      statusCode: 200,
      body: {
        name: 'any_name',
      },
    };

    return new Promise((resolve) => resolve(httpResponse));
  }
}

class LogErrorRepositoryStub implements ILogErrorRepository {
  async log(stack: string): Promise<void> {
    return new Promise((resolve) => resolve());
  }
}

let controllerStub: ControllerStub;
let logErrorRepositoryStub: ILogErrorRepository;
let sut: LogControllerDecorator;

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    passwordConfirmation: 'any_password',
  },
});

describe('LogController Decoratoor', () => {
  beforeEach(() => {
    controllerStub = new ControllerStub();
    logErrorRepositoryStub = new LogErrorRepositoryStub();
    sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub);
  });

  it('Should call controller handle ', async () => {
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    await sut.handle(makeFakeRequest());

    expect(handleSpy).toHaveBeenCalledWith(makeFakeRequest());
  });

  it('Should return the same result of the controller', async () => {
    const httpResponse = await sut.handle(makeFakeRequest());

    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'any_name',
      },
    });
  });

  it('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const fakeError = new Error();
    fakeError.stack = 'any_stack';

    const error = serverError(fakeError);
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log');

    jest.spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(new Promise((resolve) => resolve(error)));
    await sut.handle(makeFakeRequest());

    expect(logSpy).toHaveBeenCalledWith('any_stack');
  });
});
