import { MongoHelper } from '../helpers/mongoHelper';

import { ILoadAccountByEmailRepository } from '../../../../data/protocols/db/account/ILoadAccountByEmailRepository';
import { IUpdateAccessTokenRepository } from '../../../../data/protocols/db/account/IUpdateAccessTokenRepository';
import { IAccount, ICreateAccountDTO } from '../../../../data/usecases/create-account/DbCreateAccountProtocols';
import { ICreateAccountRepository } from '../../../../data/protocols/db/account/ICreateAccountRepository';
import { ILoadAccountByTokenRepository } from '../../../../data/protocols/db/account/ILoadAccountByTokenRepository';

export class AccountMongoRepository implements
  ICreateAccountRepository,
  ILoadAccountByEmailRepository,
  ILoadAccountByTokenRepository,
  IUpdateAccessTokenRepository {
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

  async updateAccessToken(id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.updateOne({
      _id: id,
    }, {
      $set: {
        accessToken: token,
      },
    });
  }

  async loadByToken(token: string, role?: string): Promise<IAccount> {
    const accountCollection = await MongoHelper.getCollection('accounts');
    const account = await accountCollection.findOne({
      accessToken: token,
      role,
    });
    return account && MongoHelper.map(account);
  }
}
