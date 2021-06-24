import MockDate from 'mockdate';

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

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('Should call LoadSurveys', async () => {
    class LoadSurveysStub implements ILoadSurveys {
      async load(): Promise<ISurvey[]> {
        return new Promise((resolve) => resolve(makeFakeSurveys()));
      }
    }
    const loadSurveysStub = new LoadSurveysStub();
    const loadSpy = jest.spyOn(loadSurveysStub, 'load');
    const sut = new LoadSurveysController(loadSurveysStub);
    await sut.handle({});
    expect(loadSpy).toHaveBeenCalled();
  });
});
