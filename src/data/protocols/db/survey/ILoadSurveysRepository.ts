import { ISurvey } from '../../../../domain/models/ISurvey';

export interface ILoadSurveyRepository {
  loadAll(): Promise<ISurvey[]>
}
