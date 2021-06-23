import { DbCreateSurvey } from '../../../../../data/usecases/create-survey/DbCreateSurvey';
import { SurveyMongoRepository } from '../../../../../infra/database/mongodb/survey/SurveyMongoRepository';

import { ICreateSurvey } from '../../../../../domain/usecases/ICreateSurvey';

export const makeDbCreateSurvey = (): ICreateSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbCreateSurvey(surveyMongoRepository);
};
