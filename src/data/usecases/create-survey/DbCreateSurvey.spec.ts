import { DbCreateSurvey } from './DbCreateSurvey';

import { ICreateSurveyDTO, ICreateSurveyRepository } from './DbCreateSurveyProtocols';

const makeFakeSurveyDTO = (): ICreateSurveyDTO => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer',
  }],
});

describe('DbCreateSurvey Usecase', () => {
  it('Should call CreateSurveyRepository with correct values', async () => {
    class CreateSurveyRepositoryStub implements ICreateSurveyRepository {
      async create(survey: ICreateSurveyDTO): Promise<void> {
        return new Promise((resolve) => resolve());
      }
    }
    const createSurveyRepositoryStub = new CreateSurveyRepositoryStub();
    const createSpy = jest.spyOn(createSurveyRepositoryStub, 'create');
    const sut = new DbCreateSurvey(createSurveyRepositoryStub);
    const surveyDTO = makeFakeSurveyDTO();
    await sut.create(surveyDTO);
    expect(createSpy).toHaveBeenCalledWith(surveyDTO);
  });
});
