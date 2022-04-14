import { mockLoadSurveyById } from '../../../test';
import { IHttpRequest, ILoadSurveyById } from './loadSurveyResultControllerProtocols';
import { LoadSurveyResultController } from './loadSurveyResultController';

const makeFakeRequest = (): IHttpRequest => ({
  params: {
    surveyId: 'any_id',
  },
});

type ISutTypes = {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: ILoadSurveyById
}

const makeSut = (): ISutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById();
  const sut = new LoadSurveyResultController(loadSurveyByIdStub);
  return {
    sut,
    loadSurveyByIdStub,
  };
};

describe('LoadSurveyResult Controller', () => {
  it('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');
    await sut.handle(makeFakeRequest());
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });
});
