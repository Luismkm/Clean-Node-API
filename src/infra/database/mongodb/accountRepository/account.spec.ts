import { Collection } from 'mongodb';
import { MongoHelper } from '../helpers/mongoHelper';
import { AccountMongoRepository } from './Account';

let sut: AccountMongoRepository;
let accountCollection: Collection;

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts');
    accountCollection.deleteMany({});

    sut = new AccountMongoRepository();
  });

  it('Should return an account on create success', async () => {
    const account = await sut.create({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any_email@mail.com');
    expect(account.password).toBe('any_password');
  });

  it('Should return an account on loadByEmail success', async () => {
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
    });
    const account = await sut.loadByEmail('any_email@mail.com');
    expect(account).toBeTruthy();
    expect(account.id).toBeTruthy();
    expect(account.name).toBe('any_name');
    expect(account.email).toBe('any_email@mail.com');
    expect(account.password).toBe('any_password');
  });

  it('Should return null if loadByEmail fails', async () => {
    const account = await sut.loadByEmail('any_email@mail.com');
    expect(account).toBeFalsy();
  });
});
