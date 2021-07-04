import MockDate from 'mockdate';

import { mockSurvey } from '../../../../domain/test';
import { mockLoadSurveyByIdRepository } from '../../../tests';
import { DbLoadSurveyById } from './DbLoadSurveyById';

import { ILoadSurveyByIdRepository } from './DbLoadSurveyByIdProtocols';

type ISutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositoryStub: ILoadSurveyByIdRepository
 }

const makeSut = ():ISutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyByIdRepository();
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub);
  return {
    sut,
    loadSurveyByIdRepositoryStub,
  };
};

describe('DbLoadSurveyById', () => {
  beforeAll(() => {
    MockDate.set(new Date());
  });

  afterAll(() => {
    MockDate.reset();
  });

  it('Should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    const loadByIdSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById');
    await sut.loadById('any_id');
    expect(loadByIdSpy).toHaveBeenCalledWith('any_id');
  });

  it('Should return Survey on success', async () => {
    const { sut } = makeSut();
    const survey = await sut.loadById('any_id');
    expect(survey).toEqual(mockSurvey());
  });

  it('Should throw if LoadSurveyByIdRepository throws', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut();
    jest
      .spyOn(loadSurveyByIdRepositoryStub, 'loadById')
      .mockReturnValueOnce(Promise.reject(new Error()));
    const promise = sut.loadById('any_id');
    await expect(promise).rejects.toThrow();
  });
});
