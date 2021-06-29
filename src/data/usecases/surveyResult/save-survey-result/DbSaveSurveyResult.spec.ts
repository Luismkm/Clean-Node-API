import MockDate from 'mockdate';

import { mockSaveSurveyResultDTO, mockSurveyResult, throwError } from '../../../../domain/test';
import { mockSaveSurveyResultRepository } from '../../../tests';
import { DbSaveSurveyResult } from './DbSaveSurveyResult';

import { ISaveSurveyResultRepository } from './DbSaveSurveyResultProtocols';

type ISutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: ISaveSurveyResultRepository
}

const makeSut = (): ISutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository();
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub);
  return {
    sut,
    saveSurveyResultRepositoryStub,
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

  it('Should return Survey on success', async () => {
    const { sut } = makeSut();
    const surveyResult = await sut.save(mockSaveSurveyResultDTO());
    expect(surveyResult).toEqual(mockSurveyResult());
  });
});
