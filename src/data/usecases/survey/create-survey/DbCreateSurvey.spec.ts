import MockDate from 'mockdate';
import { throwError } from '../../../../domain/test';
import { DbCreateSurvey } from './DbCreateSurvey';

import { ICreateSurveyDTO, ICreateSurveyRepository } from './DbCreateSurveyProtocols';

const makeFakeSurveyDTO = (): ICreateSurveyDTO => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer',
  }],
  date: new Date(),
});

const makeCreateSurveyRepository = (): ICreateSurveyRepository => {
  class CreateSurveyRepositoryStub implements ICreateSurveyRepository {
    async create(survey: ICreateSurveyDTO): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new CreateSurveyRepositoryStub();
};

type ISutTypes = {
  sut: DbCreateSurvey
  createSurveyRepositoryStub: ICreateSurveyRepository
}

const makeSut = (): ISutTypes => {
  const createSurveyRepositoryStub = makeCreateSurveyRepository();
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
    const surveyDTO = makeFakeSurveyDTO();
    await sut.create(surveyDTO);
    expect(createSpy).toHaveBeenCalledWith(surveyDTO);
  });

  it('Should throw if CreateSurveyRepository throws', async () => {
    const { sut, createSurveyRepositoryStub } = makeSut();
    jest
      .spyOn(createSurveyRepositoryStub, 'create')
      .mockImplementationOnce(throwError);
    const promise = sut.create(makeFakeSurveyDTO());
    await expect(promise).rejects.toThrow();
  });
});
