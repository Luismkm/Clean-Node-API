import { Collection } from 'mongodb';
import { MongoHelper } from '../helpers/mongoHelper';
import { AccountMongoRepository } from './AccountMongoRepository';

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

  describe('add()', () => {
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
  });

  describe('loadByEmail()', () => {
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
      const account = await sut.loadByEmail('any_mail@mail.com');
      expect(account).toBeFalsy();
    });
  });

  describe('updateAccessToken()', () => {
    it('Should update the account accessToken on updateAccessToken success', async () => {
      const res = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
      });
      const fakeAccount = res.ops[0];
      expect(fakeAccount.accessToken).toBeFalsy();
      await sut.updateAccessToken(fakeAccount._id, 'any_token');
      const account = await accountCollection.findOne({ _id: fakeAccount._id });
      expect(account).toBeTruthy();
      expect(account.accessToken).toBe('any_token');
    });
  });

  describe('loadByToken()', () => {
    it('Should return an account on loadByToken without role', async () => {
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
      });
      const account = await sut.loadByToken('any_token');
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe('any_name');
      expect(account.email).toBe('any_email@mail.com');
      expect(account.password).toBe('any_password');
    });

    it('Should return an account on loadByToken with role', async () => {
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'any_role',
      });
      const account = await sut.loadByToken('any_token', 'any_role');
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe('any_name');
      expect(account.email).toBe('any_email@mail.com');
      expect(account.password).toBe('any_password');
    });
  });
});
