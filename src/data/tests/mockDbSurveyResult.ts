import { ISaveSurveyResultRepository } from '../protocols/db/surveyResult/ISaveSurveyResultRepository';
import { ISaveSurveyResultDTO } from '../../domain/usecases/surveyResult/ISaveSurveyResult';
import { ISurveyResult } from '../../domain/models/ISurveyResult';
import { mockSurveyResult } from '../../domain/test';

export const mockSaveSurveyResultRepository = (): ISaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements ISaveSurveyResultRepository {
    async save(data: ISaveSurveyResultDTO): Promise<ISurveyResult> {
      return new Promise((resolve) => resolve(mockSurveyResult()));
    }
  }
  return new SaveSurveyResultRepositoryStub();
};
