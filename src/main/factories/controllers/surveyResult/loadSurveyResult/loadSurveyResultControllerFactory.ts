import { makeLogControllerDecorator } from '../../../decorators/logControllerDecoratorFactory';

import { IController } from '../../../../../presentation/protocols';
import { makeDbLoadSurveyById } from '../../../usecases/survey/loadSurveyById/dbLoadSurveyByIdFactory';
import { LoadSurveyResultController } from '../../../../../presentation/controllers/surveyResult/loadSurveyResult/loadSurveyResultController';
import { makeDbLoadSurveyResult } from '../../../usecases/surveyResult/loadSurveyResult/dbLoadSurveyResultFactory';

export const makeLoadSurveyResultController = (): IController => {
  const controller = new LoadSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbLoadSurveyResult(),
  );
  return makeLogControllerDecorator(controller);
};
