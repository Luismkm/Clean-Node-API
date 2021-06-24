import {
  IController,
  IHttpRequest,
  IHttpResponse,
  ILoadSurveys,
} from './loadSurveysControllerProtocols';

export class LoadSurveysController implements IController {
  constructor(private readonly loadSurveys: ILoadSurveys) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    await this.loadSurveys.load();
    return null;
  }
}
