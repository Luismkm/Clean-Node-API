import MockDate from 'mockdate';
import { ILoadSurveyResultRepository, ILoadSurveyByIdRepository } from './DbLoadSurveyResultProtocols';
import { mockLoadSurveyByIdRepository, mockLoadSurveyResultRepository } from '../../tests';
import { DbLoadSurveyResult } from './DbLoadSurveyResult';
import { mockSurveyResult, throwError } from '../../../domain/test';

type ISutTypes = {
  sut: DbLoadSurveyResult
  loadSurveyResultRepositoryStub: ILoadSurveyResultRepository
  loadSurveyByIdRepositoryStub: ILoadSurveyByIdRepository
}

const makeSut = (): ISutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository();
  const sut = new DbLoadSurveyResult(loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub);

  return {
    sut,
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub,
  };
};

describe('DbLoadSurveyResult UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId');
    await sut.load('any_survey_id', 'account_id');
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith('any_survey_id', 'account_id');
  });

  it('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockImplementationOnce(throwError);
    const promise = sut.load('any_survey_id', 'account_id');
    await expect(promise).rejects.toThrow();
  });

  it('Should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
    const { sut, loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockReturnValueOnce(Promise.resolve(null));
    await sut.load('any_survey_id', 'account_id');
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id');
  });

  it('Should return surveyResultModel on success', async () => {
    const { sut } = makeSut();
    const surveyResult = await sut.load('any_survey_id', 'account_id');
    expect(surveyResult).toEqual(mockSurveyResult());
  });
});
