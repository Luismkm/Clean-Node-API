import { ISurvey } from '../../../domain/models/ISurvey';
import { ILoadSurveys } from '../../../domain/usecases/ILoadSurveys';
import { ILoadSurveyRepository } from '../../protocols/db/survey/ILoadSurveysRepository';

export class DbLoadSurveys implements ILoadSurveys {
  constructor(private readonly loadSurveysRepository: ILoadSurveyRepository) {}

  async load(): Promise<ISurvey[]> {
    const surveys = await this.loadSurveysRepository.loadAll();
    return surveys;
  }
}
