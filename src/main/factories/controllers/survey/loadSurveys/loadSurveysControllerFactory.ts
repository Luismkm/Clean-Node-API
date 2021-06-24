import { makeLogControllerDecorator } from '../../../decorators/logControllerDecoratorFactory';
import { LoadSurveysController } from '../../../../../presentation/controllers/survey/loadSurvey/LoadSurveysController';
import { makeDbLoadSurveys } from '../../../usecases/survey/loadSurveys/dbLoadSurveyFactory';

import { IController } from '../../../../../presentation/protocols';

export const makeLoadSurveysController = (): IController => {
  const controller = new LoadSurveysController(makeDbLoadSurveys());
  return makeLogControllerDecorator(controller);
};
