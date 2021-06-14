import { ICreateAccountDTO } from '../../../domain/usecases/ICreateAccount';
import { IAccount } from '../../../domain/models/IAccount';

export interface ICreateAccountRepository {
  create(account: ICreateAccountDTO): Promise<IAccount>
}
