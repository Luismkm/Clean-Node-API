import { IController, IHttpRequest, IHttpResponse } from '../../presentation/protocols';
import { LogControllerDecorator } from './log';

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

let controllerStub: ControllerStub;
let sut: LogControllerDecorator;

describe('LogController Decoratoor', () => {
  beforeEach(() => {
    controllerStub = new ControllerStub();
    sut = new LogControllerDecorator(controllerStub);
  });

  it('Should call controller handle ', async () => {
    const handleSpy = jest.spyOn(controllerStub, 'handle');
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        passowrd: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    await sut.handle(httpRequest);
    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });

  it('Should return the same result of the controller', async () => {
    const httpRequest = {
      body: {
        email: 'any_email@mail.com',
        name: 'any_name',
        passowrd: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpResponse = await sut.handle(httpRequest);
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'any_name',
      },
    });
  });
});
