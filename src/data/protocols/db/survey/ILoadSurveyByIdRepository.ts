import { ISurvey } from '../../../../domain/models/ISurvey';

export interface ILoadSurveyByIdRepository {
  loadById(id: string): Promise<ISurvey>
}
