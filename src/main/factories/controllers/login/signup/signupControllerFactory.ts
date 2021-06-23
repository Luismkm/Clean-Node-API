import { SignUpController } from '../../../../../presentation/controllers/login/signup/SignUp';

import { makeDbAuthentication } from '../../../usecases/account/authentication/dbAuthenticationFactory';
import { makeSignUpValidation } from './signupValidationFactory';
import { makeDbCreateAccount } from '../../../usecases/account/createAccount/dbCreateAccountFactory';
import { makeLogControllerDecorator } from '../../../decorators/logControllerDecoratorFactory';

import { IController } from '../../../../../presentation/protocols';

export const makeSignUpController = (): IController => {
  const controller = new SignUpController(
    makeDbCreateAccount(),
    makeSignUpValidation(),
    makeDbAuthentication(),
  );
  return makeLogControllerDecorator(controller);
};
