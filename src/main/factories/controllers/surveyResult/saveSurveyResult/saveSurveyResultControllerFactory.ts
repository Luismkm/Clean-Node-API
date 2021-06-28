import { makeLogControllerDecorator } from '../../../decorators/logControllerDecoratorFactory';
import { SaveSurveyResultController } from '../../../../../presentation/controllers/surveyResult/saveSurveyResult/saveSurveyResultController';

import { IController } from '../../../../../presentation/protocols';
import { makeDbLoadSurveyById } from '../../../usecases/survey/loadSurveyById/dbLoadSurveyByIdFactory';
import { makeDbSaveSurveyResult } from '../../../usecases/surveyResult/saveSurveyResult/dbSaveSurveyResultFactory';

export const makeSaveSurveyResultController = (): IController => {
  const controller = new SaveSurveyResultController(
    makeDbLoadSurveyById(),
    makeDbSaveSurveyResult(),
  );
  return makeLogControllerDecorator(controller);
};
