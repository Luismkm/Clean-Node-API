import { MongoHelper } from '../helpers/mongoHelper';

import { ICreateSurveyRepository } from '../../../../data/protocols/db/survey/ICreateSurveyRepository';
import { ICreateSurveyDTO } from '../../../../domain/usecases/ICreateSurvey';

export class SurveyMongoRepository implements ICreateSurveyRepository {
  async create(survey: ICreateSurveyDTO): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys');
    await surveyCollection.insertOne(survey);
  }
}
