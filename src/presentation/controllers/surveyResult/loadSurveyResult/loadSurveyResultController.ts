import { InvalidParamError } from '../../../errors';
import { forbidden } from '../../../helpers/http/http-helper';
import {
  IController, IHttpRequest, IHttpResponse, ILoadSurveyById,
} from './loadSurveyResultControllerProtocols';

export class LoadSurveyResultController implements IController {
  constructor(private readonly loadSurveyById: ILoadSurveyById) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const survey = await this.loadSurveyById.loadById(httpRequest.params.surveyId);
    if (!survey) {
      return forbidden(new InvalidParamError('surveyId'));
    }
    return Promise.resolve(null);
  }
}
