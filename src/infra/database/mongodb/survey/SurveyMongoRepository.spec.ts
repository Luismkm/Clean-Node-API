import { Collection } from 'mongodb';
import { MongoHelper } from '../helpers/mongoHelper';
import { SurveyMongoRepository } from './SurveyMongoRepository';

let sut: SurveyMongoRepository;
let surveyCollection: Collection;

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys');
    surveyCollection.deleteMany({});

    sut = new SurveyMongoRepository();
  });

  it('Should create a survey on success', async () => {
    await sut.create({
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
    const survey = await surveyCollection.findOne({ question: 'any_question' });
    expect(survey).toBeTruthy();
  });
});
