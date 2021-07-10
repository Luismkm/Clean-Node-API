import { IAccount } from '../../../../domain/models/IAccount';
import { ICreateAccountDTO } from '../../../../domain/usecases/account/ICreateAccount';

export interface ICreateAccountRepository {
  create(account: ICreateAccountDTO): Promise<IAccount>
}
