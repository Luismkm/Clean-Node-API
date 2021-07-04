import { ISurvey } from '../models/ISurvey';
import { ICreateSurveyDTO } from '../usecases/survey/ICreateSurvey';

export const mockSurvey = (): ISurvey => ({
  id: 'any_id',
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer',
  }],
  date: new Date(),
});

export const mockSurveys = (): ISurvey[] => [{
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

export const mockCreateSurveyDTO = (): ICreateSurveyDTO => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer',
  }],
  date: new Date(),
});
