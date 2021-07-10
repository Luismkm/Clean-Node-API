import { ICreateSurveyDTO } from '../../../../domain/usecases/survey/ICreateSurvey';

export interface ICreateSurveyRepository {
  create(survey: ICreateSurveyDTO): Promise<void>
}
