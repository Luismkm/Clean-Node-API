import { SignUpController } from '../../../../presentation/controllers/signup/SignUp';

import { makeDbAuthentication } from '../../usecases/authentication/dbAuthenticationFactory';
import { makeSignUpValidation } from './signupValidationFactory';
import { makeDbCreateAccount } from '../../usecases/createAccount/dbCreateAccountFactory';
import { makeLogControllerDecorator } from '../../decorators/logControllerDecoratorFactory';

import { IController } from '../../../../presentation/protocols';

export const makeSignUpController = (): IController => {
  const controller = new SignUpController(
    makeDbCreateAccount(),
    makeSignUpValidation(),
    makeDbAuthentication(),
  );
  return makeLogControllerDecorator(controller);
};
