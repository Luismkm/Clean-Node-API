import MockDate from 'mockdate';

import { mockCreateSurveyDTO, throwError } from '../../../../domain/test';
import { mockCreateSurveyRepository } from '../../../tests';
import { DbCreateSurvey } from './DbCreateSurvey';

import { ICreateSurveyRepository } from './DbCreateSurveyProtocols';

type ISutTypes = {
  sut: DbCreateSurvey
  createSurveyRepositoryStub: ICreateSurveyRepository
}

const makeSut = (): ISutTypes => {
  const createSurveyRepositoryStub = mockCreateSurveyRepository();
  const sut = new DbCreateSurvey(createSurveyRepositoryStub);
  return {
    sut,
    createSurveyRepositoryStub,
  };
};

describe('DbCreateSurvey Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('Should call CreateSurveyRepository with correct values', async () => {
    const { sut, createSurveyRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(createSurveyRepositoryStub, 'create');
    const surveyDTO = mockCreateSurveyDTO();
    await sut.create(surveyDTO);
    expect(createSpy).toHaveBeenCalledWith(surveyDTO);
  });

  it('Should throw if CreateSurveyRepository throws', async () => {
    const { sut, createSurveyRepositoryStub } = makeSut();
    jest
      .spyOn(createSurveyRepositoryStub, 'create')
      .mockImplementationOnce(throwError);
    const promise = sut.create(mockCreateSurveyDTO());
    await expect(promise).rejects.toThrow();
  });
});
