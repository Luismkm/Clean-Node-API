import { IAccount } from '../../../../domain/models/IAccount';

export interface ILoadAccountByEmailRepository {
  loadByEmail (email: string): Promise<IAccount>
}
