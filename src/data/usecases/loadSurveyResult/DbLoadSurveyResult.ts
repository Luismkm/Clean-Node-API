import { ISurveyResult } from '../saveSurveyResult/DbSaveSurveyResultProtocols';
import { ILoadSurveyResult } from '../../../domain/usecases/surveyResult/ILoadSurveyResult';
import { ILoadSurveyResultRepository } from '../../protocols/db/surveyResult/ILoadSurveyResultRepository';

export class DbLoadSurveyResult implements ILoadSurveyResult {
  constructor(private readonly loadSurveyResultRepository: ILoadSurveyResultRepository) {}

  async load(surveyId: string): Promise<ISurveyResult> {
    await this.loadSurveyResultRepository.loadBySurveyId(surveyId);
    return null;
  }
}
