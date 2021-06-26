import env from '../../../../config/env';
import { DbAuthentication } from '../../../../../data/usecases/account/authentication/DbAuthentication';
import { BcryptAdapter } from '../../../../../infra/criptography/bcryptAdapter/BcryptAdapter';
import { JwtAdapter } from '../../../../../infra/criptography/jwtAdapter/jwtAdapter';
import { AccountMongoRepository } from '../../../../../infra/database/mongodb/account/AccountMongoRepository';

import { IAuthentication } from '../../../../../domain/usecases/account/IAuthentication';

export const makeDbAuthentication = (): IAuthentication => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbAuthentication(
    accountMongoRepository,
    bcryptAdapter,
    jwtAdapter,
    accountMongoRepository,
  );
};
