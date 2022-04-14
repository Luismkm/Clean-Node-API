import { mockLoadSurveyById, mockLoadSurveyResult } from '../../../test';
import { IHttpRequest, ILoadSurveyById, ILoadSurveyResult } from './loadSurveyResultControllerProtocols';
import { LoadSurveyResultController } from './loadSurveyResultController';
import { forbidden, serverError } from '../../../helpers/http/http-helper';
import { InvalidParamError } from '../../../errors';
import { throwError } from '../../../../domain/test';

const makeFakeRequest = (): IHttpRequest => ({
  params: {
    surveyId: 'any_id',
  },
});

type ISutTypes = {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: ILoadSurveyById
  loadSurveyResultStub: ILoadSurveyResult
}

const makeSut = (): ISutTypes => {
  const loadSurveyByIdStub = mockLoadSurveyById();
  const loadSurveyResultStub = mockLoadSurveyResult();
  const sut = new LoadSurveyResultController(loadSurveyByIdStub, loadSurveyResultStub);
  return {
    sut,
    loadSurveyByIdStub,
    loadSurveyResultStub,
  };
};

describe('LoadSurveyResult Controller', () => {
  it('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById');
    await sut.handle(makeFakeRequest());
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });

  it('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockReturnValueOnce(Promise.resolve(null));
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(forbidden(new InvalidParamError('surveyId')));
  });

  it('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut();
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should call LoadSurveyResult with correct value', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveyResultStub, 'load');
    await sut.handle(makeFakeRequest());
    expect(loadSpy).toHaveBeenCalledWith('any_id');
  });

  it('Should return 500 if LoadSurveyResult throws', async () => {
    const { sut, loadSurveyResultStub } = makeSut();
    jest.spyOn(loadSurveyResultStub, 'load').mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });
});
