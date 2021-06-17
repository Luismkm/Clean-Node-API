import env from '../../config/env';
import { DbAuthentication } from '../../../data/usecases/authentication/DbAuthentication';
import { BcryptAdapter } from '../../../infra/criptography/bcryptAdapter/BcryptAdapter';
import { JwtAdapter } from '../../../infra/criptography/jwtAdapter/jwtAdapter';
import { AccountMongoRepository } from '../../../infra/database/mongodb/account/AccountMongoRepository';
import { LogMongoRepository } from '../../../infra/database/mongodb/logRepository/log';
import { LoginController } from '../../../presentation/controllers/login/LoginController';
import { LogControllerDecorator } from '../../decorators/LogControllerDecorator';

import { IController } from '../../../presentation/protocols';

import { makeLoginValidation } from './loginValidationFactory';

export const makeLoginController = (): IController => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  const dbAuthentication = new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository,
  );
  const loginController = new LoginController(dbAuthentication, makeLoginValidation());
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(loginController, logMongoRepository);
};
