import { SurveyResultMongoRepository } from '../../../../../infra/database/mongodb/surveyResult/surveyResultMongoRepository';

import { ILoadSurveyResult } from '../../../../../domain/usecases/surveyResult/ILoadSurveyResult';
import { DbLoadSurveyResult } from '../../../../../data/usecases/loadSurveyResult/DbLoadSurveyResult';
import { SurveyMongoRepository } from '../../../../../infra/database/mongodb/survey/SurveyMongoRepository';

export const makeDbLoadSurveyResult = (): ILoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository();
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository);
};
