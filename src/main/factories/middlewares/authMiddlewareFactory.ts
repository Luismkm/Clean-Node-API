import { AuthMiddleware } from '../../../presentation/middlewares/AuthMiddleware';
import { IMiddleware } from '../../../presentation/protocols';
import { makeDbLoadAccountByToken } from '../usecases/account/loadAccountByToken/DbLoadAccountByTokenFactory.ts';

export const makeAuthMiddleware = (role?: string): IMiddleware => (
  new AuthMiddleware(makeDbLoadAccountByToken(), role)
);
