import { IAccount } from '../models/IAccount';

export interface ILoadAccountByToken {
  load(accessToken: string, role?: string): Promise<IAccount>
}
