import { ILoadSurveyResultRepository, ISurveyResult, ILoadSurveyResult } from './DbLoadSurveyResultProtocols';

export class DbLoadSurveyResult implements ILoadSurveyResult {
  constructor(private readonly loadSurveyResultRepository: ILoadSurveyResultRepository) {}

  async load(surveyId: string): Promise<ISurveyResult> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId);
    return surveyResult;
  }
}
