import { IAccount } from '../models/IAccount';
import { IAuthenticationDTO } from '../usecases/account/IAuthentication';
import { ICreateAccountDTO } from '../usecases/account/ICreateAccount';

export const mockAccountDTO = (): ICreateAccountDTO => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
});

export const mockAccount = (): IAccount => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'hashed_password',
});

export const mockAuthentication = (): IAuthenticationDTO => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});
