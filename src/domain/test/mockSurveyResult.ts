import { ISurveyResult } from '../models/ISurveyResult';
import { ISaveSurveyResultDTO } from '../usecases/surveyResult/ISaveSurveyResult';

export const mockSaveSurveyResultDTO = (): ISaveSurveyResultDTO => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date(),
});

export const mockSurveyResult = (): ISurveyResult => ({
  surveyId: 'any_survey_id',
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    count: 1,
    percent: 50,
    isCurrentAccountAnswer: true,
  }, {
    answer: 'other_answer',
    image: 'any_image',
    count: 10,
    percent: 80,
    isCurrentAccountAnswer: false,
  }],
  date: new Date(),
});
