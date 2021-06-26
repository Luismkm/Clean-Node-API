import { ISurveyResult } from '../../models/ISurveyResult';

export type ISaveSurveyResultDTO = Omit<ISurveyResult, 'id'>

export interface ISaveSurveyResult {
  save(data: ISaveSurveyResultDTO): Promise<ISurveyResult>
}
