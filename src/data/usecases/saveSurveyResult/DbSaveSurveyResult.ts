import {
  ISurveyResult,
  ISaveSurveyResult,
  ISaveSurveyResultDTO,
  ISaveSurveyResultRepository,
  ILoadSurveyResultRepository,
} from './DbSaveSurveyResultProtocols';

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: ISaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: ILoadSurveyResultRepository,
  ) {}

  async save(data: ISaveSurveyResultDTO): Promise<ISurveyResult> {
    await this.saveSurveyResultRepository.save(data);
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId, data.accountId);
    return surveyResult;
  }
}
