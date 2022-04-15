import { SurveyResultMongoRepository } from '../../../../../infra/database/mongodb/surveyResult/surveyResultMongoRepository';

import { ISaveSurveyResult } from '../../../../../domain/usecases/surveyResult/ISaveSurveyResult';
import { DbSaveSurveyResult } from '../../../../../data/usecases/saveSurveyResult/DbSaveSurveyResult';

export const makeDbSaveSurveyResult = (): ISaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultMongoRepository();
  return new DbSaveSurveyResult(surveyResultMongoRepository, surveyResultMongoRepository);
};
