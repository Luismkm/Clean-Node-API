import { MongoHelper } from '../helpers/mongoHelper';

import { ICreateSurveyRepository } from '../../../../data/protocols/db/survey/ICreateSurveyRepository';
import { ICreateSurveyDTO } from '../../../../domain/usecases/survey/ICreateSurvey';
import { ILoadSurveyRepository } from '../../../../data/protocols/db/survey/ILoadSurveysRepository';
import { ISurvey } from '../../../../domain/models/ISurvey';
import { ILoadSurveyByIdRepository } from '../../../../data/protocols/db/survey/ILoadSurveyByIdRepository';

export class SurveyMongoRepository implements
  ICreateSurveyRepository,
  ILoadSurveyRepository,
  ILoadSurveyByIdRepository {
  async create(survey: ICreateSurveyDTO): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.insertOne(survey);
  }

  async loadAll(): Promise<ISurvey[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const surveys = await surveyCollection.find().toArray();
    return MongoHelper.mapCollection(surveys);
  }

  async loadById(id: string): Promise<ISurvey> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const survey = await surveyCollection.findOne({ _id: id });
    return survey && MongoHelper.map(survey);
  }
}
