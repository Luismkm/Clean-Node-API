import { SignUpController } from '../../../presentation/controllers/signup/SignUp';
import { DbCreateAccount } from '../../../data/usecases/create-account/DbCreateAccount';
import { BcryptAdapter } from '../../../infra/criptography/bcryptAdapter/BcryptAdapter';
import { AccountMongoRepository } from '../../../infra/database/mongodb/accountRepository/Account';
import { LogMongoRepository } from '../../../infra/database/mongodb/logRepository/log';
import { LogControllerDecorator } from '../../decorators/log';

import { makeSignUpValidation } from './signupValidation';

import { IController } from '../../../presentation/protocols';

export const makeSignUpController = (): IController => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  const dbCreateAccount = new DbCreateAccount(bcryptAdapter, accountMongoRepository);
  const signUpController = new SignUpController(
    dbCreateAccount,
    makeSignUpValidation(),
  );
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(signUpController, logMongoRepository);
};
