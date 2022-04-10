import {
  ISurveyResult,
  ISaveSurveyResult,
  ISaveSurveyResultDTO,
  ISaveSurveyResultRepository,
} from './DbSaveSurveyResultProtocols';

export class DbSaveSurveyResult implements ISaveSurveyResult {
  constructor(private readonly saveSurveyResultRepository: ISaveSurveyResultRepository) {}

  async save(data: ISaveSurveyResultDTO): Promise<ISurveyResult> {
    const surveyResult = await this.saveSurveyResultRepository.save(data);
    return surveyResult;
  }
}
