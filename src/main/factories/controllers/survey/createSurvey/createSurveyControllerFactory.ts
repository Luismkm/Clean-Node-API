import { CreateSurveyController } from '../../../../../presentation/controllers/survey/createSurvey/CreateSurveyController';
import { makeLogControllerDecorator } from '../../../decorators/logControllerDecoratorFactory';
import { makeCreateSurveyValidation } from './createSurveyValidationFactory';
import { makeDbCreateSurvey } from '../../../usecases/survey/createSurvey/dbCreateSurveyFactory';

import { IController } from '../../../../../presentation/protocols';

export const makeCreateSurveyController = (): IController => {
  const controller = new CreateSurveyController(makeCreateSurveyValidation(), makeDbCreateSurvey());
  return makeLogControllerDecorator(controller);
};
