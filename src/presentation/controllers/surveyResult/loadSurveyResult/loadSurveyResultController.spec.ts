import { mockLoadSurveyById } from '../../../test';
import { IHttpRequest } from './loadSurveyResultControllerProtocols';
import { LoadSurveyResultController } from './loadSurveyResultController';

const makeFakeRequest = (): IHttpRequest => ({
  params: {
    surveyId: 'any_id',
  },
});

describe('LoadSurveyResult Controller', () => {
  it('Should call LoadSurveyById with correct value', async () => {
    const loadSurveyByIdStub = mockLoadSurveyById();
    const sut = new LoadSurveyResultController(loadSurveyByIdStub);
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');
    await sut.handle(makeFakeRequest());
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });
});
