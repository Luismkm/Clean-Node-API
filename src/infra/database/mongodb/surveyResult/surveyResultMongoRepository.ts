import { MongoHelper } from '../helpers/mongoHelper';

import { ISaveSurveyResultRepository } from '../../../../data/protocols/db/surveyResult/ISaveSurveyResultRepository';
import { ISurveyResult } from '../../../../domain/models/ISurveyResult';
import { ISaveSurveyResultDTO } from '../../../../domain/usecases/surveyResult/ISaveSurveyResult';

export class SurveyResultMongoRepository implements ISaveSurveyResultRepository {
  async save(data: ISaveSurveyResultDTO): Promise<ISurveyResult> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults');
    const res = await surveyResultCollection.findOneAndUpdate({
      surveyId: data.surveyId,
      accountId: data.accountId,
    }, {
      $set: {
        answer: data.answer,
        date: data.date,
      },
    }, {
      upsert: true,
      returnOriginal: false,
    });
    return res.value && MongoHelper.map(res.value);
  }
}
