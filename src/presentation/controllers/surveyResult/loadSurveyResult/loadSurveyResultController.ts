import {
  IController, IHttpRequest, IHttpResponse, ILoadSurveyById,
} from './loadSurveyResultControllerProtocols';

export class LoadSurveyResultController implements IController {
  constructor(private readonly loadSurveyById: ILoadSurveyById) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    await this.loadSurveyById.loadById(httpRequest.params.surveyId);
    return Promise.resolve(null);
  }
}
