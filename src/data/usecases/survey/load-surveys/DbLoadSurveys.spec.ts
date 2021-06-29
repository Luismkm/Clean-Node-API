import MockDate from 'mockdate';

import { mockSurveys } from '../../../../domain/test';
import { mockLoadSurveysRepository } from '../../../tests';
import { DbLoadSurveys } from './DbLoadSurveys';

import { ILoadSurveyRepository } from './DbLoadSurveysProtocols';

type ISutTypes = {
 sut: DbLoadSurveys
 loadSurveysRepositoryStub: ILoadSurveyRepository
}

const makeSut = ():ISutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepository();
  const sut = new DbLoadSurveys(loadSurveysRepositoryStub);
  return {
    sut,
    loadSurveysRepositoryStub,
  };
};

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut();
    const loadAllSpy = jest.spyOn(loadSurveysRepositoryStub, 'loadAll');
    await sut.load();
    expect(loadAllSpy).toHaveBeenCalled();
  });

  it('Should return a list of Surveys on success', async () => {
    const { sut } = makeSut();
    const surveys = await sut.load();
    expect(surveys).toEqual(mockSurveys());
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
