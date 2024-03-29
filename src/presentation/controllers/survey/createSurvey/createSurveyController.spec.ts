import MockDate from 'mockdate';

import { throwError } from '../../../../domain/test';
import { mockValidation } from '../../../../validation/tests';
import { CreateSurveyController } from './CreateSurveyController';
import { badRequest, noContent, serverError } from '../../../helpers/http/http-helper';

import {
  IHttpRequest,
  IValidation,
  ICreateSurvey,
} from './createSurveyControllerProtocols';
import { mockCreateSurvey } from '../../../test/mockSurvey';

const makeFakeRequest = (): IHttpRequest => ({
  body: {
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer',
    }],
    date: new Date(),
  },
});

type ISutTypes = {
  sut: CreateSurveyController
  validationStub: IValidation
  createSurveyStub: ICreateSurvey
}

const makeSut = (): ISutTypes => {
  const validationStub = mockValidation();
  const createSurveyStub = mockCreateSurvey();
  const sut = new CreateSurveyController(validationStub, createSurveyStub);
  return {
    sut,
    validationStub,
    createSurveyStub,
  };
};

describe('CreateSurvey Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut();
    const validationSpy = jest.spyOn(validationStub, 'validate');
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  it('Should return 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut();
    jest.spyOn(validationStub, 'validate')
      .mockReturnValueOnce(new Error());
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(badRequest(new Error()));
  });

  it('Should call CreateSurvey with correct values', async () => {
    const { sut, createSurveyStub } = makeSut();
    const createSpy = jest.spyOn(createSurveyStub, 'create');
    const httpRequest = makeFakeRequest();
    await sut.handle(httpRequest);
    expect(createSpy).toHaveBeenCalledWith(httpRequest.body);
  });

  it('Should return 500 if CreateSurvey throws', async () => {
    const { sut, createSurveyStub } = makeSut();
    jest.spyOn(createSurveyStub, 'create')
      .mockImplementationOnce(throwError);
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(serverError(new Error()));
  });

  it('Should return 204 on success', async () => {
    const { sut } = makeSut();
    const httpResponse = await sut.handle(makeFakeRequest());
    expect(httpResponse).toEqual(noContent());
  });
});
