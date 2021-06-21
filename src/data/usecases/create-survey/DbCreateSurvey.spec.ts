import { DbCreateSurvey } from './DbCreateSurvey';

import { ICreateSurveyDTO, ICreateSurveyRepository } from './DbCreateSurveyProtocols';

const makeFakeSurveyDTO = (): ICreateSurveyDTO => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer',
  }],
});

const makeCreateSurveyRepository = (): ICreateSurveyRepository => {
  class CreateSurveyRepositoryStub implements ICreateSurveyRepository {
    async create(survey: ICreateSurveyDTO): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }
  return new CreateSurveyRepositoryStub();
};

interface ISutTypes {
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
  it('Should call CreateSurveyRepository with correct values', async () => {
    const { sut, createSurveyRepositoryStub } = makeSut();
    const createSpy = jest.spyOn(createSurveyRepositoryStub, 'create');
    const surveyDTO = makeFakeSurveyDTO();
    await sut.create(surveyDTO);
    expect(createSpy).toHaveBeenCalledWith(surveyDTO);
  });
});
