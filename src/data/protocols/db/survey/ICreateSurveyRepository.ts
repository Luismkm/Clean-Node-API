import { ICreateSurveyDTO } from '../../../../domain/usecases/ICreateSurvey';

export interface ICreateSurveyRepository {
  create(survey: ICreateSurveyDTO): Promise<void>
}
