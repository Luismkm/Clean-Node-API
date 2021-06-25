import { ISurveyResult } from '../models/ISurveyResult';

export type SaveSurveyResultDTO = Omit<ISurveyResult, 'id'>

export interface ISaveSurveyResult {
  save(data: SaveSurveyResultDTO): Promise<ISurveyResult>
}
