import { ISurveyResult } from '../../models/ISurveyResult';

export type ISaveSurveyResultDTO = {
  surveyId: string,
  accountId: string,
  answer: string,
  date: Date
}

export interface ISaveSurveyResult {
  save(data: ISaveSurveyResultDTO): Promise<ISurveyResult>
}
