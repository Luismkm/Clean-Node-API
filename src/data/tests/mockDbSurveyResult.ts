import { ISaveSurveyResultRepository } from '../protocols/db/surveyResult/ISaveSurveyResultRepository';
import { ISaveSurveyResultDTO } from '../../domain/usecases/surveyResult/ISaveSurveyResult';
import { ISurveyResult } from '../../domain/models/ISurveyResult';
import { mockSurveyResult } from '../../domain/test';
import { ILoadSurveyResultRepository } from '../protocols/db/surveyResult/ILoadSurveyResultRepository';

export const mockSaveSurveyResultRepository = (): ISaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements ISaveSurveyResultRepository {
    async save(data: ISaveSurveyResultDTO): Promise<ISurveyResult> {
      return Promise.resolve(mockSurveyResult());
    }
  }
  return new SaveSurveyResultRepositoryStub();
};

export const mockLoadSurveyResultRepository = (): ILoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements ILoadSurveyResultRepository {
    async loadBySurveyId(surveyId: string): Promise<ISurveyResult> {
      return Promise.resolve(mockSurveyResult());
    }
  }
  return new LoadSurveyResultRepositoryStub();
};
