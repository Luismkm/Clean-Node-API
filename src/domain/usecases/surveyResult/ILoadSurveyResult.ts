import { ISurveyResult } from '../../models/ISurveyResult';

export interface ILoadSurveyResult {
  load(surveyId: string): Promise<ISurveyResult>
}
