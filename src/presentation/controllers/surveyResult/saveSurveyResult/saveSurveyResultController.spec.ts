import { SaveSurveyResultController } from './saveSurveyResultController';
import { IHttpRequest, ILoadSurveyById, ISurvey } from './saveSurveyResultControllerProtocols';

const makeFakeRequest = (): IHttpRequest => ({
  params: {
    surveyId: 'any_survey_id',
  },
});

const makeFakeSurvey = (): ISurvey => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer',
  }],
  date: new Date(),

});

const makeLoadSurveyById = (): ILoadSurveyById => {
  class LoadSurveyByIdStub implements ILoadSurveyById {
    async loadById(id: string): Promise<ISurvey> {
      return new Promise((resolve) => resolve(makeFakeSurvey()));
    }
  }
  return new LoadSurveyByIdStub();
};

type ISutTypes = {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: ILoadSurveyById
}

const makeSut = (): ISutTypes => {
  const loadSurveyByIdStub = makeLoadSurveyById();
  const sut = new SaveSurveyResultController(loadSurveyByIdStub);
  return {
    sut,
    loadSurveyByIdStub,
  };
};

describe('SaveSurveyResult Controller', () => {
  it('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');
    await sut.handle(makeFakeRequest());
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id');
  });
});
