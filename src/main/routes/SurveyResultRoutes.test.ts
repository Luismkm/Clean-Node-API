import request from 'supertest';
import { Collection } from 'mongodb';
import { sign } from 'jsonwebtoken';

import app from '../config/app';
import { MongoHelper } from '../../infra/database/mongodb/helpers/mongoHelper';
import env from '../config/env';

let surveyCollection: Collection;
let accountCollection: Collection;

const makeAccesToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'email@mail.com',
    password: 'any_password',
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

  describe('PUT /surveys/:surveyId/results', () => {
    it('Should return 403 on save survey without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer',
        })
        .expect(403);
    });

    it('Should return 200 on save survey result with accessToken', async () => {
      const accessToken = await makeAccesToken();
      const res = await surveyCollection.insertOne({
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
        date: new Date(),
      });
      await request(app)
        .put(`/api/surveys/${res.ops[0]._id}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'Answer 1',
        })
        .expect(200);
    });
  });

  describe('GET /surveys/:surveyId/results', () => {
    it('Should return 403 on load survey without accessToken', async () => {
      await request(app)
        .get('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer',
        })
        .expect(403);
    });

    it('Should return 200 on load survey result with accessToken', async () => {
      const accessToken = await makeAccesToken();
      const res = await surveyCollection.insertOne({
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
        date: new Date(),
      });
      await request(app)
        .put(`/api/surveys/${res.ops[0]._id}/results`)
        .set('x-access-token', accessToken)
        .expect(200);
    });
  });
});
