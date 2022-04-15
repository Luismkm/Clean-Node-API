import { ISurveyResult } from '../../models/ISurveyResult';

export interface ILoadSurveyResult {
  load(surveyId: string, accountId: string): Promise<ISurveyResult>
}
