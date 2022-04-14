import { InvalidParamError } from '../../../errors';
import { forbidden, serverError, success } from '../../../helpers/http/http-helper';
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
      const surveyResult = await this.loadSurveyResult.load(surveyId);
      return success(surveyResult);
    } catch (error) {
      return serverError(error);
    }
  }
}
