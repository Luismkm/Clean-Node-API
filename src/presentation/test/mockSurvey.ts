import { mockSurvey, mockSurveys } from '../../domain/test';
import { ICreateSurvey, ICreateSurveyDTO } from '../controllers/survey/createSurvey/createSurveyControllerProtocols';
import { ILoadSurveys, ISurvey } from '../controllers/survey/loadSurvey/loadSurveysControllerProtocols';
import { ILoadSurveyById } from '../controllers/surveyResult/saveSurveyResult/saveSurveyResultControllerProtocols';

export const mockCreateSurvey = (): ICreateSurvey => {
  class CreateSurvey implements ICreateSurvey {
    async create(data: ICreateSurveyDTO): Promise<void> {
      return Promise.resolve();
    }
  }
  return new CreateSurvey();
};

export const mockLoadSurveys = (): ILoadSurveys => {
  class LoadSurveysStub implements ILoadSurveys {
    async load(): Promise<ISurvey[]> {
      return Promise.resolve(mockSurveys());
    }
  }
  return new LoadSurveysStub();
};

export const mockLoadSurveyById = (): ILoadSurveyById => {
  class LoadSurveyByIdStub implements ILoadSurveyById {
    async loadById(id: string): Promise<ISurvey> {
      return Promise.resolve(mockSurvey());
    }
  }
  return new LoadSurveyByIdStub();
};
