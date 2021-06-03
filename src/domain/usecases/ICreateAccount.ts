import { IAccount } from '../models/IAccount';

export interface ICreateAccountTest {
  name: string,
  email: string,
  password: string,
}

export interface ICreateAccount {
  create(account: ICreateAccountTest): Promise<IAccount>
}
