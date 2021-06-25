import { ISurvey } from '../../../domain/models/ISurvey';
import { ILoadSurveyById } from '../../../domain/usecases/ILoadSurveyById';
import { ILoadSurveyByIdRepository } from '../../protocols/db/survey/ILoadSurveyByIdRepository';

export class DbLoadSurveyById implements ILoadSurveyById {
  constructor(private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository) {}

  async loadById(id: string): Promise<ISurvey> {
    const survey = await this.loadSurveyByIdRepository.loadById(id);
    return survey;
  }
}
