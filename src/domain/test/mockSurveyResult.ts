import { ISurveyResult } from '../models/ISurveyResult';
import { ISaveSurveyResultDTO } from '../usecases/surveyResult/ISaveSurveyResult';

export const mockSaveSurveyResultDTO = (): ISaveSurveyResultDTO => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer',
  date: new Date(),
});

export const mockSurveyResult = (): ISurveyResult => ({
  ...mockSaveSurveyResultDTO(), id: 'any_id',
});
