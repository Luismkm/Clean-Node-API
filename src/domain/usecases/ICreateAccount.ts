import { IAccount } from '../models/IAccount';

export interface ICreateAccountDTO {
  name: string,
  email: string,
  password: string,
}

export interface ICreateAccount {
  create(account: ICreateAccountDTO): Promise<IAccount>
}
