import MockDate from 'mockdate';

import { success } from '../../../helpers/http/http-helper';
import { LoadSurveysController } from './LoadSurveysController';

import { ILoadSurveys, ISurvey } from './loadSurveysControllerProtocols';

const makeFakeSurveys = (): ISurvey[] => [{
  id: 'any_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer',
  }],
  date: new Date(),

},
{
  id: 'other_id',
  question: 'other_question',
  answers: [{
    image: 'other_image',
    answer: 'other_answer',
  }],
  date: new Date(),

}];

interface ISutTypes {
  sut: LoadSurveysController
  loadSurveysStub: ILoadSurveys

}

const makeLoadSurveys = (): ILoadSurveys => {
  class LoadSurveysStub implements ILoadSurveys {
    async load(): Promise<ISurvey[]> {
      return new Promise((resolve) => resolve(makeFakeSurveys()));
    }
  }
  return new LoadSurveysStub();
};

const makeSut = (): ISutTypes => {
  const loadSurveysStub = makeLoadSurveys();
  const sut = new LoadSurveysController(loadSurveysStub);
  return {
    sut,
    loadSurveysStub,
  };
};

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('Should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut();
    const loadSpy = jest.spyOn(loadSurveysStub, 'load');
    await sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });

  it('Should return 200 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(success(makeFakeSurveys()));
  });
});
