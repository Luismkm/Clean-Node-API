import { DbLoadSurveys } from '../../../../../data/usecases/survey/load-surveys/DbLoadSurveys';
import { SurveyMongoRepository } from '../../../../../infra/database/mongodb/survey/SurveyMongoRepository';

import { ILoadSurveys } from '../../../../../domain/usecases/survey/ILoadSurveys';

export const makeDbLoadSurveys = (): ILoadSurveys => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveys(surveyMongoRepository);
};
