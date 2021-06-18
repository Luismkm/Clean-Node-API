import { LoginController } from '../../../../presentation/controllers/login/LoginController';

import { IController } from '../../../../presentation/protocols';

import { makeLoginValidation } from './loginValidationFactory';
import { makeDbAuthentication } from '../../usecases/authentication/dbAuthenticationFactory';
import { makeLogControllerDecorator } from '../../decorators/logControllerDecoratorFactory';

export const makeLoginController = (): IController => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation());
  return makeLogControllerDecorator(controller);
};
