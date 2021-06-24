import { DbLoadAccountByToken } from '../../../../../data/usecases/load-account-by-token/DbLoadAccountByToken';
import { JwtAdapter } from '../../../../../infra/criptography/jwtAdapter/jwtAdapter';
import { AccountMongoRepository } from '../../../../../infra/database/mongodb/account/AccountMongoRepository';
import env from '../../../../config/env';

import { ILoadAccountByToken } from '../../../../../domain/usecases/ILoadAccountByToken';

export const makeDbLoadAccountByToken = (): ILoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbLoadAccountByToken(jwtAdapter, accountMongoRepository);
};
