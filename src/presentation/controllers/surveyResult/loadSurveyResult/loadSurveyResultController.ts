import { InvalidParamError } from '../../../errors';
import { forbidden, serverError } from '../../../helpers/http/http-helper';
import {
  IController, IHttpRequest, IHttpResponse, ILoadSurveyById, ILoadSurveyResult,
} from './loadSurveyResultControllerProtocols';

export class LoadSurveyResultController implements IController {
  constructor(
    private readonly loadSurveyById: ILoadSurveyById,
    private readonly loadSurveyResult: ILoadSurveyResult,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { surveyId } = httpRequest.params;
      const survey = await this.loadSurveyById.loadById(surveyId);
      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'));
      }
      await this.loadSurveyResult.load(surveyId);
      return null;
    } catch (error) {
      return serverError(error);
    }
  }
}
