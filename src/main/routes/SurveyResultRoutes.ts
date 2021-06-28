import { Router } from 'express';

import { adaptRoute } from '../adapter/express/expressRouteAdapter';
import { makeSaveSurveyResultController } from '../factories/controllers/surveyResult/saveSurveyResult/saveSurveyResultControllerFactory';
import { auth } from '../middlewares/auth';

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()));
};
