import { MongoHelper } from '../helpers/mongoHelper';

import { ICreateSurveyRepository } from '../../../../data/protocols/db/survey/ICreateSurveyRepository';
import { ICreateSurveyDTO } from '../../../../domain/usecases/ICreateSurvey';
import { ILoadSurveyRepository } from '../../../../data/protocols/db/survey/ILoadSurveysRepository';
import { ISurvey } from '../../../../domain/models/ISurvey';

export class SurveyMongoRepository implements ICreateSurveyRepository, ILoadSurveyRepository {
  async create(survey: ICreateSurveyDTO): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.insertOne(survey);
  }

  async loadAll(): Promise<ISurvey[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    const surveys: ISurvey[] = await surveyCollection.find().toArray();
    return surveys;
  }
}
