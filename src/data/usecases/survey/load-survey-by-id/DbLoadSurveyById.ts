import { ISurvey, ILoadSurveyById, ILoadSurveyByIdRepository } from './DbLoadSurveyByIdProtocols';

export class DbLoadSurveyById implements ILoadSurveyById {
  constructor(private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository) {}

  async loadById(id: string): Promise<ISurvey> {
    const survey = await this.loadSurveyByIdRepository.loadById(id);
    return survey;
  }
}
