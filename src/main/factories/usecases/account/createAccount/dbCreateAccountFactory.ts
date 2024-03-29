import { BcryptAdapter } from '../../../../../infra/criptography/bcryptAdapter/BcryptAdapter';
import { AccountMongoRepository } from '../../../../../infra/database/mongodb/account/AccountMongoRepository';
import { DbCreateAccount } from '../../../../../data/usecases/account/create-account/DbCreateAccount';

import { ICreateAccount } from '../../../../../domain/usecases/account/ICreateAccount';

export const makeDbCreateAccount = (): ICreateAccount => {
  const salt = 12;
  const bcryptAdapter = new BcryptAdapter(salt);
  const accountMongoRepository = new AccountMongoRepository();
  return new DbCreateAccount(bcryptAdapter, accountMongoRepository, accountMongoRepository);
};
