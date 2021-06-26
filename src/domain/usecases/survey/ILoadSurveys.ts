import { ISurvey } from '../../models/ISurvey';

export interface ILoadSurveys {
  load(): Promise<ISurvey[]>
}
