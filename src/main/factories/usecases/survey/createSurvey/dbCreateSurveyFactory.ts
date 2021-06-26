import { DbCreateSurvey } from '../../../../../data/usecases/survey/create-survey/DbCreateSurvey';
import { SurveyMongoRepository } from '../../../../../infra/database/mongodb/survey/SurveyMongoRepository';

import { ICreateSurvey } from '../../../../../domain/usecases/survey/ICreateSurvey';

export const makeDbCreateSurvey = (): ICreateSurvey => {
  const surveyMongoRepository = new SurveyMongoRepository();
  return new DbCreateSurvey(surveyMongoRepository);
};
