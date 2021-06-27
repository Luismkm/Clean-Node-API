import { InvalidParamError } from '../../../errors';
import { forbidden, serverError, success } from '../../../helpers/http/http-helper';

import {
  IController, IHttpRequest, IHttpResponse, ILoadSurveyById, ISaveSurveyResult,
} from './saveSurveyResultControllerProtocols';

export class SaveSurveyResultController implements IController {
  constructor(
    private readonly loadSurveyById: ILoadSurveyById,
    private readonly saveSurveyResult: ISaveSurveyResult,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const { surveyId } = httpRequest.params;
      const { answer } = httpRequest.body;
      const { accountId } = httpRequest;

      const survey = await this.loadSurveyById.loadById(surveyId);
      if (survey) {
        const answers = survey.answers.map((item) => item.answer);
        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'));
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'));
      }
      const surveyResult = await this.saveSurveyResult.save({
        accountId,
        surveyId,
        answer,
        date: new Date(),
      });
      return success(surveyResult);
    } catch (error) {
      return serverError(error);
    }
  }
}
