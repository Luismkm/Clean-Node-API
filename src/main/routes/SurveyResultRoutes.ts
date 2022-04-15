import { Router } from 'express';

import { adaptRoute } from '../adapter/express/expressRouteAdapter';
import { makeSaveSurveyResultController } from '../factories/controllers/surveyResult/saveSurveyResult/saveSurveyResultControllerFactory';
import { makeLoadSurveyResultController } from '../factories/controllers/surveyResult/loadSurveyResult/loadSurveyResultControllerFactory';
import { auth } from '../middlewares/auth';

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()));
  router.get('/surveys/:surveyId/results', auth, adaptRoute(makeLoadSurveyResultController()));
};
