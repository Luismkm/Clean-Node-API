import { DbLoadSurveys } from './DbLoadSurveys';

import { ISurvey } from '../../../domain/models/ISurvey';
import { ILoadSurveyRepository } from '../../protocols/db/survey/ILoadSurveysRepository';

const makeFakeSurveys = (): ISurvey[] => [{
  id: 'any_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer',
  }],
  date: new Date(),
},
{
  id: 'other_id',
  question: 'other_question',
  answers: [{
    image: 'other_image',
    answer: 'other_answer',
  }],
  date: new Date(),

}];

describe('DbLoadSurveys', () => {
  it('Should call LoadSurveysRepository', async () => {
    class LoadSurveysRepositoryStub implements ILoadSurveyRepository {
      async loadAll(): Promise<ISurvey[]> {
        return new Promise((resolve) => resolve(makeFakeSurveys()));
      }
    }
    const loadSurveysRepositoryStub = new LoadSurveysRepositoryStub();
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');
    const sut = new DbLoadSurveys(loadSurveysRepositoryStub);
    sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });
});
