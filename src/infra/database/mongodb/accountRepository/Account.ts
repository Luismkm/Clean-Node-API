import { ICreateAccountRepository } from '../../../../data/protocols/db/ICreateAccountRepository';
import { ICreateAccountDTO } from '../../../../domain/usecases/ICreateAccount';
import { IAccount } from '../../../../domain/models/IAccount';
import { MongoHelper } from '../helpers/mongoHelper';
import { ILoadAccountByEmailRepository } from '../../../../data/protocols/db/ILoadAccountByEmailRepository';

export class AccountMongoRepository implements
  ICreateAccountRepository,
  ILoadAccountByEmailRepository {
  async create(account: ICreateAccountDTO): Promise<IAccount> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const result = await accountCollection.insertOne(account);
    return MongoHelper.map(result.ops[0]);
  }

  async loadByEmail(email: string): Promise<IAccount> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({ email });
    return account && MongoHelper.map(account);
  }
}
