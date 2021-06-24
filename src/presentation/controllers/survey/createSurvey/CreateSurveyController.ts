import { badRequest, noContent, serverError } from '../../../helpers/http/http-helper';

import {
  IController,
  ICreateSurvey,
  IHttpRequest,
  IHttpResponse,
  IValidation,
} from './createSurveyControllerProtocols';

export class CreateSurveyController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly createSurvey: ICreateSurvey,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);
      if (error) {
        return badRequest(error);
      }

      const { question, answers } = httpRequest.body;
      await this.createSurvey.create({
        question,
        answers,
        date: new Date(),
      });

      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}
