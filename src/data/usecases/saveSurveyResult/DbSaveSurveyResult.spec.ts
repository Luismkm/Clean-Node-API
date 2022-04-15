import MockDate from 'mockdate';

import { mockSaveSurveyResultDTO, mockSurveyResult, throwError } from '../../../domain/test';
import { mockLoadSurveyResultRepository, mockSaveSurveyResultRepository } from '../../tests';
import { DbSaveSurveyResult } from './DbSaveSurveyResult';

import { ISaveSurveyResultRepository, ILoadSurveyResultRepository } from './DbSaveSurveyResultProtocols';

type ISutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: ISaveSurveyResultRepository
  loadSurveyResultRepositoryStub: ILoadSurveyResultRepository
}

const makeSut = (): ISutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository();
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepository();
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub, loadSurveyResultRepositoryStub);
  return {
    sut,
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub,
  };
};

describe('DbSaveSurveyResult Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    const saveSpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save');
    const surveyResultDTO = mockSaveSurveyResultDTO();
    await sut.save(surveyResultDTO);
    expect(saveSpy).toHaveBeenCalledWith(surveyResultDTO);
  });

  it('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    jest.spyOn(saveSurveyResultRepositoryStub, 'save')
      .mockImplementationOnce(throwError);
    const promise = sut.save(mockSaveSurveyResultDTO());
    await expect(promise).rejects.toThrow();
  });

  it('Should call LoadSurveyResultRepository with correct values', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    const loadBySurveyIdSpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId');
    const surveyResultDTO = mockSaveSurveyResultDTO();
    await sut.save(surveyResultDTO);
    expect(loadBySurveyIdSpy).toHaveBeenCalledWith(surveyResultDTO.surveyId, surveyResultDTO.accountId);
  });

  it('Should throw if LoadSurveyResultRepository throws', async () => {
    const { sut, loadSurveyResultRepositoryStub } = makeSut();
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
      .mockImplementationOnce(throwError);
    const promise = sut.save(mockSaveSurveyResultDTO());
    await expect(promise).rejects.toThrow();
  });

  it('Should return SurveyResult on success', async () => {
    const { sut } = makeSut();
    const surveyResult = await sut.save(mockSaveSurveyResultDTO());
    expect(surveyResult).toEqual(mockSurveyResult());
  });
});
