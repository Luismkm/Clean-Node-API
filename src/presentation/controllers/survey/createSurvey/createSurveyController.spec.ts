import { CreateSurveyController } from './CreateSurveyController';

import {
  IController,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from './createSurveyControllerProtocols';

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer',
    }],
  },
});

const makeValidationStub = (): IValidation => {
  class ValidationStub implements IValidation {
    validate(input: any): Error {
      return null;
    }
  }
  return new ValidationStub();
};

interface ISutTypes {
  sut: CreateSurveyController
  validationStub: IValidation
}

const makeSut = (): ISutTypes => {
  const validationStub = makeValidationStub();
  const sut = new CreateSurveyController(validationStub);
  return {
    sut,
    validationStub,
  };
};

describe('CreateSurvey Controller', () => {
  it('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validationSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body);
  });
});
