import MockDate from 'mockdate';

import { DbSaveSurveyResult } from './DbSaveSurveyResult';

import {
  ISaveSurveyResultDTO,
  ISurveyResult,
  ISaveSurveyResultRepository,
} from './DbSaveSurveyResultProtocols';

const makeFakeSurveyResultDTO = (): ISaveSurveyResultDTO => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date(),
});

const makeFakeSurveyResult = (): ISurveyResult => ({
  ...makeFakeSurveyResultDTO(), id: 'any_id',
});

const makeSaveSurveyResultRepository = (): ISaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements ISaveSurveyResultRepository {
    async save(data: ISaveSurveyResultDTO): Promise<ISurveyResult> {
      return new Promise((resolve) => resolve(makeFakeSurveyResult()));
    }
  }
  return new SaveSurveyResultRepositoryStub();
};

type ISutTypes = {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: ISaveSurveyResultRepository
}

const makeSut = (): ISutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository();
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
    const surveyResultDTO = makeFakeSurveyResultDTO();
    await sut.save(surveyResultDTO);
    expect(saveSpy).toHaveBeenCalledWith(surveyResultDTO);
  });

  it('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut();
    jest.spyOn(saveSurveyResultRepositoryStub, 'save')
      .mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())));
    const promise = sut.save(makeFakeSurveyResultDTO());
    await expect(promise).rejects.toThrow();
  });
});
