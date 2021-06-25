import { ISurvey } from '../models/ISurvey';

export type ICreateSurveyDTO = Omit<ISurvey, 'id'>

export interface ICreateSurvey {
  create(data: ICreateSurveyDTO): Promise<void>
}
