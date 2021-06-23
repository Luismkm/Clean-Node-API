import { IAccount } from '../../../../domain/models/IAccount';

export interface ILoadAccountByTokenRepository {
  loadByToken (token: string, role?: string): Promise<IAccount>
}
