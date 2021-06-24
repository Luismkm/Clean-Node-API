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

interface ISutTypes {
 sut: DbLoadSurveys
 loadSurveysRepositoryStub: ILoadSurveyRepository
}

const makeLoadSurveysRepository = ():ILoadSurveyRepository => {
  class LoadSurveysRepositoryStub implements ILoadSurveyRepository {
    async loadAll(): Promise<ISurvey[]> {
      return new Promise((resolve) => resolve(makeFakeSurveys()));
    }
  }
  return new LoadSurveysRepositoryStub();
};

const makeSut = ():ISutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveysRepository();
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub);
  return {
    sut,
    loadSurveysRepositoryStub,
  };
};

describe('DbLoadSurveys', () => {
  it('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });

  it('Should return a list of Surveys on success', async () => {
    const { sut } = makeSut();
    const surveys = await sut.load();
    expect(surveys).toEqual(makeFakeSurveys());
  });

  it('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveysRepositoryStub, 'loadAll')
      .mockReturnValueOnce(new Promise((resolve, rejects) => rejects(new Error())));
    const promise = sut.load();
    await expect(promise).rejects.toThrow();
  });
});
