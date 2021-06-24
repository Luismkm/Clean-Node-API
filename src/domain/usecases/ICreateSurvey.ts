import { SurveyAnswer } from '../models/ISurvey';

export interface ICreateSurveyDTO {
  question: string,
  answers: SurveyAnswer[]
  date: Date
}

export interface ICreateSurvey {
  create(data: ICreateSurveyDTO): Promise<void>
}
