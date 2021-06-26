import {
  IController, IHttpRequest, IHttpResponse, ILoadSurveyById,
} from './saveSurveyResultControllerProtocols';

export class SaveSurveyResultController implements IController {
  constructor(private readonly loadSurveyById: ILoadSurveyById) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    await this.loadSurveyById.loadById(httpRequest.params.surveyId);
    return null;
  }
}
