import { IAccount } from '../../models/IAccount';

export type ICreateAccountDTO = Omit<IAccount, 'id'>

export interface ICreateAccount {
  create(account: ICreateAccountDTO): Promise<IAccount>
}
