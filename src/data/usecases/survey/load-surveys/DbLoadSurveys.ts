import { ISurvey, ILoadSurveys, ILoadSurveyRepository } from './DbLoadSurveysProtocols';

export class DbLoadSurveys implements ILoadSurveys {
  constructor(private readonly loadSurveysRepository: ILoadSurveyRepository) {}

  async load(): Promise<ISurvey[]> {
    const surveys = await this.loadSurveysRepository.loadAll();
    return surveys;
  }
}
