import { mockSurveyResult } from '../../domain/test';
import { ILoadSurveyResult } from '../../domain/usecases/surveyResult/ILoadSurveyResult';
import { ISaveSurveyResult, ISaveSurveyResultDTO, ISurveyResult } from '../controllers/surveyResult/saveSurveyResult/saveSurveyResultControllerProtocols';

export const mockSaveSurveyResult = (): ISaveSurveyResult => {
  class SaveSurveyResultStub implements ISaveSurveyResult {
    async save(data: ISaveSurveyResultDTO): Promise<ISurveyResult> {
      return Promise.resolve(mockSurveyResult());
    }
  }
  return new SaveSurveyResultStub();
};

export const mockLoadSurveyResult = (): ILoadSurveyResult => {
  class LoadSurveyResultStub implements ILoadSurveyResult {
    async load(surveyId: string, accountId: string): Promise<ISurveyResult> {
      return Promise.resolve(mockSurveyResult());
    }
  }
  return new LoadSurveyResultStub();
};
