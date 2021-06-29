import { mockSurvey, mockSurveys } from '../../domain/test';

import { ISurvey } from '../../domain/models/ISurvey';
import { ICreateSurveyDTO } from '../../domain/usecases/survey/ICreateSurvey';
import { ICreateSurveyRepository } from '../protocols/db/survey/ICreateSurveyRepository';
import { ILoadSurveyByIdRepository } from '../protocols/db/survey/ILoadSurveyByIdRepository';
import { ILoadSurveyRepository } from '../protocols/db/survey/ILoadSurveysRepository';

export const mockCreateSurveyRepository = (): ICreateSurveyRepository => {
  class CreateSurveyRepositoryStub implements ICreateSurveyRepository {
    async create(survey: ICreateSurveyDTO): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new CreateSurveyRepositoryStub();
};

export const mockLoadSurveyByIdRepository = (): ILoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements ILoadSurveyByIdRepository {
    async loadById(id: string): Promise<ISurvey> {
      return new Promise((resolve) => resolve(mockSurvey()));
    }
  }
  return new LoadSurveyByIdRepositoryStub();
};

export const mockLoadSurveysRepository = ():ILoadSurveyRepository => {
  class LoadSurveysRepositoryStub implements ILoadSurveyRepository {
    async loadAll(): Promise<ISurvey[]> {
      return new Promise((resolve) => resolve(mockSurveys()));
    }
  }
  return new LoadSurveysRepositoryStub();
};
