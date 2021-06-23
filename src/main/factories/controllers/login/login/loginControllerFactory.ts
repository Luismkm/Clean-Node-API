import { LoginController } from '../../../../../presentation/controllers/login/login/LoginController';

import { makeLoginValidation } from './loginValidationFactory';
import { makeDbAuthentication } from '../../../usecases/account/authentication/dbAuthenticationFactory';
import { makeLogControllerDecorator } from '../../../decorators/logControllerDecoratorFactory';

import { IController } from '../../../../../presentation/protocols';

export const makeLoginController = (): IController => {
  const controller = new LoginController(makeDbAuthentication(), makeLoginValidation());
  return makeLogControllerDecorator(controller);
};
