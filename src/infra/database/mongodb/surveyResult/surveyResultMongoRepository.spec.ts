import { Collection } from 'mongodb';

import { MongoHelper } from '../helpers/mongoHelper';
import { SurveyResultMongoRepository } from './surveyResultMongoRepository';

import { ISurvey } from '../../../../domain/models/ISurvey';
import { IAccount } from '../../../../domain/models/IAccount';

let sut: SurveyResultMongoRepository;

let surveyCollection: Collection;
let surveyResultCollection: Collection;
let accountCollection: Collection;

const makeSurvey = async (): Promise<ISurvey> => {
  const res = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer',
      },
      {
        answer: 'other_answer',
      },
    ],
    date: new Date(),
  });
  return res.ops[0];
};

const makeAccount = async (): Promise<IAccount> => {
  const res = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
  });
  return res.ops[0];
};

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.deleteMany({});

    surveyResultCollection = await MongoHelper.getCollection('surveyResults');
    await surveyResultCollection.deleteMany({});

    accountCollection = await MongoHelper.getCollection('accounts');
    await accountCollection.deleteMany({});

    sut = new SurveyResultMongoRepository();
  });

  describe('save()', () => {
    it('Should create a survey result its new', async () => {
      const survey = await makeSurvey();
      const account = await makeAccount();
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date(),
      });
      expect(surveyResult).toBeTruthy();
      expect(surveyResult.id).toBeTruthy();
      expect(surveyResult.answer).toBe(survey.answers[0].answer);
    });
  });
});
