import { LogControllerDecorator } from './LogControllerDecorator';
import { serverError, success } from '../../presentation/helpers/http/http-helper';
import { mockLogErrorRepository } from '../../data/tests';
import { mockAccount } from '../../domain/test';

import { IController, IHttpRequest, IHttpResponse } from '../../presentation/protocols';
import { ILogErrorRepository } from '../../data/protocols/db/log/ILogErrorRepository';

const makeController = (): IController => {
  class ControllerStub implements IController {
    async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
      return Promise.resolve(success(mockAccount()));
    }
  }
  return new ControllerStub();
};

let controllerStub: IController;
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
    controllerStub = makeController();
    logErrorRepositoryStub = mockLogErrorRepository();
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
      body: mockAccount(),
    });
  });

  it('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const fakeError = new Error();
    fakeError.stack = 'any_stack';

    const error = serverError(fakeError);
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError');

    jest.spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(Promise.resolve(error));
    await sut.handle(makeFakeRequest());

    expect(logSpy).toHaveBeenCalledWith('any_stack');
  });
});
