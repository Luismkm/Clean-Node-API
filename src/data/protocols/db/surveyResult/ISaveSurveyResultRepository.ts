import { ISurveyResult } from '../../../../domain/models/ISurveyResult';
import { ISaveSurveyResultDTO } from '../../../../domain/usecases/ISaveSurveyResult';

export interface ISaveSurveyResultRepository {
  save(data: ISaveSurveyResultDTO): Promise<ISurveyResult>
}
