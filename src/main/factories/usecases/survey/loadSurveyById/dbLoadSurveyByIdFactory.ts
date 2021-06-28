import { DbLoadSurveyById } from '../../../../../data/usecases/survey/load-survey-by-id/DbLoadSurveyById';
import { SurveyMongoRepository } from '../../../../../infra/database/mongodb/survey/SurveyMongoRepository';

import { ILoadSurveyById } from '../../../../../domain/usecases/survey/ILoadSurveyById';

export const makeDbLoadSurveyById = (): ILoadSurveyById => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveyById(surveyMongoRepository);
};
