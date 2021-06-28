import { DbSaveSurveyResult } from '../../../../../data/usecases/surveyResult/save-survey-result/DbSaveSurveyResult';
import { SurveyResultMongoRepository } from '../../../../../infra/database/mongodb/surveyResult/surveyResultMongoRepository';

import { ISaveSurveyResult } from '../../../../../domain/usecases/surveyResult/ISaveSurveyResult';

export const makeDbSaveSurveyResult = (): ISaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository();
  return new DbSaveSurveyResult(surveyResultMongoRepository);
};
