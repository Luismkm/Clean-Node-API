import { IAccount } from '../../../domain/models/IAccount';

export interface ILoadAccountByEmailRepository {
  load(email: string): Promise<IAccount>
}
