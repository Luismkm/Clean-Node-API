import { ICreateSurvey, ICreateSurveyDTO, ICreateSurveyRepository } from './DbCreateSurveyProtocols';

export class DbCreateSurvey implements ICreateSurvey {
  constructor(private readonly createSurveyRepository: ICreateSurveyRepository) {}

  async create(data: ICreateSurveyDTO): Promise<void> {
    await this.createSurveyRepository.create(data);
  }
}
