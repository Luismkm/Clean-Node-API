import request from 'supertest';
import { sign } from 'jsonwebtoken';
import { Collection } from 'mongodb';

import app from '../config/app';
import env from '../config/env';
import { MongoHelper } from '../../infra/database/mongodb/helpers/mongoHelper';

let surveyCollection: Collection;
let accountCollection: Collection;

const makeAccesToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'email@mail.com',
    password: 'any_password',
    role: 'admin',
  });
  const id = res.ops[0]._id;
  const accessToken = sign({ id }, env.jwtSecret);
  await accountCollection.updateOne({
    _id: id,
  }, {
    $set: {
      accessToken,
    },
  });
  return accessToken;
};

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});

    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});
  });

  describe('POST /surveys', () => {
    it('Should return 403 on create survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com',
            },
            {
              answer: 'Answer 2',
            },
          ],
        })
        .expect(403);
    });

    it('Should return 204 on create survey with valid accessToken', async () => {
      const accessToken = await makeAccesToken();
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'http://image-name.com',
            },
            {
              answer: 'Answer 2',
            },
          ],
        })
        .expect(204);
    });
  });

  describe('GET /surveys', () => {
    it('Should return 403 on load surveys without accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403);
    });

    it('Should return 204 on load surveys with valid accessToken', async () => {
      const accessToken = await makeAccesToken();
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(204);
    });
  });
});
