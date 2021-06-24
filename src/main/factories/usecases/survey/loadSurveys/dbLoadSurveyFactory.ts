import { DbLoadSurveys } from '../../../../../data/usecases/load-surveys/DbLoadSurveys';
import { SurveyMongoRepository } from '../../../../../infra/database/mongodb/survey/SurveyMongoRepository';

import { ILoadSurveys } from '../../../../../domain/usecases/ILoadSurveys';

export const makeDbLoadSurveys = (): ILoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveys(surveyMongoRepository);
};
