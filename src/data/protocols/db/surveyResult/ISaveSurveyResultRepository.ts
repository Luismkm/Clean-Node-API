import { ISurveyResult } from '../../../../domain/models/ISurveyResult';
import { ISaveSurveyResultDTO } from '../../../../domain/usecases/surveyResult/ISaveSurveyResult';

export interface ISaveSurveyResultRepository {
  save(data: ISaveSurveyResultDTO): Promise<ISurveyResult>
}
