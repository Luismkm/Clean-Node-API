import { Collection } from 'mongodb';
import { mockAccountDTO } from '../../../../domain/test';
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
    await accountCollection.deleteMany({});

    sut = new AccountMongoRepository();
  });

  describe('add()', () => {
    it('Should return an account on create success', async () => {
      const account = await sut.create(mockAccountDTO());
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe('any_name');
      expect(account.email).toBe('any_email');
      expect(account.password).toBe('any_password');
    });
  });

  describe('loadByEmail()', () => {
    it('Should return an account on loadByEmail success', async () => {
      await accountCollection.insertOne(mockAccountDTO());
      const account = await sut.loadByEmail('any_email');
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe('any_name');
      expect(account.email).toBe('any_email');
      expect(account.password).toBe('any_password');
    });

    it('Should return null if loadByEmail fails', async () => {
      const account = await sut.loadByEmail('any_mail');
      expect(account).toBeFalsy();
    });
  });

  describe('updateAccessToken()', () => {
    it('Should update the account accessToken on updateAccessToken success', async () => {
      const res = await accountCollection.insertOne(mockAccountDTO());
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

    it('Should return an account on loadByToken with admin role', async () => {
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'admin',
      });
      const account = await sut.loadByToken('any_token', 'admin');
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe('any_name');
      expect(account.email).toBe('any_email@mail.com');
      expect(account.password).toBe('any_password');
    });

    it('Should return null on loadByToken with invalid role', async () => {
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
      });
      const account = await sut.loadByToken('any_token', 'admin');
      expect(account).toBeFalsy();
    });

    it('Should return an account on loadByToken with if user is admin', async () => {
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token',
        role: 'admin',
      });
      const account = await sut.loadByToken('any_token');
      expect(account).toBeTruthy();
      expect(account.id).toBeTruthy();
      expect(account.name).toBe('any_name');
      expect(account.email).toBe('any_email@mail.com');
      expect(account.password).toBe('any_password');
    });

    it('Should return null if loadByToken fails', async () => {
      const account = await sut.loadByToken('any_token');
      expect(account).toBeFalsy();
    });
  });
});
