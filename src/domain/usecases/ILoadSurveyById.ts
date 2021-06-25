import { ISurvey } from '../models/ISurvey';

export interface ILoadSurveyById {
  loadById(id: string): Promise<ISurvey>
}
