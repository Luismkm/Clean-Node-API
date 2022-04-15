import { ISurveyResult } from '../../../../domain/models/ISurveyResult';

export interface ILoadSurveyResultRepository {
  loadBySurveyId(surveyId: string, accountId: string): Promise<ISurveyResult>
}
