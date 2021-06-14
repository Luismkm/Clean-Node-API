import { ICreateAccountRepository } from '../../../../data/protocols/db/ICreateAccountRepository';
import { ICreateAccountDTO } from '../../../../domain/usecases/ICreateAccount';
import { IAccount } from '../../../../domain/models/IAccount';
import { MongoHelper } from '../helpers/mongoHelper';

export class AccountMongoRepository implements ICreateAccountRepository {
  async create(account: ICreateAccountDTO): Promise<IAccount> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(account);

    return MongoHelper.map(result.ops[0]);
  }
}
