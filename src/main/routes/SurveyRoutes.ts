import { Router } from 'express';
import { adaptMiddleware } from '../adapter/express/expressMiddlewareAdapter';

import { adaptRoute } from '../adapter/express/expressRouteAdapter';
import { makeCreateSurveyController } from '../factories/controllers/survey/createSurvey/createSurveyControllerFactory';
import { makeLoadSurveysController } from '../factories/controllers/survey/loadSurveys/loadSurveysControllerFactory';
import { makeAuthMiddleware } from '../factories/middlewares/authMiddlewareFactory';

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'));
  const auth = adaptMiddleware(makeAuthMiddleware());

  router.post('/surveys', adminAuth, adaptRoute(makeCreateSurveyController()));
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()));
};
