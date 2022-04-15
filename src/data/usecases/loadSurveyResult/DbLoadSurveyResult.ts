import {
  ILoadSurveyResultRepository, ISurveyResult, ILoadSurveyResult, ILoadSurveyByIdRepository,
} from './DbLoadSurveyResultProtocols';

export class DbLoadSurveyResult implements ILoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: ILoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository,
  ) {}

  async load(surveyId: string, accountId: string): Promise<ISurveyResult> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId, accountId);
    if (!surveyResult) {
      await this.loadSurveyByIdRepository.loadById(surveyId);
    }
    return surveyResult;
  }
}
