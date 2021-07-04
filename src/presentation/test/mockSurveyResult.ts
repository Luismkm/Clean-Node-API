import { mockSurveyResult } from '../../domain/test';
import { ISaveSurveyResult, ISaveSurveyResultDTO, ISurveyResult } from '../controllers/surveyResult/saveSurveyResult/saveSurveyResultControllerProtocols';

export const mockSaveSurveyResult = (): ISaveSurveyResult => {
  class SaveSurveyResultStub implements ISaveSurveyResult {
    async save(data: ISaveSurveyResultDTO): Promise<ISurveyResult> {
      return Promise.resolve(mockSurveyResult());
    }
  }
  return new SaveSurveyResultStub();
};
