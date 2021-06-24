import { Router } from 'express';
import { adaptMiddleware } from '../adapter/express/expressMiddlewareAdapter';

import { adaptRoute } from '../adapter/express/expressRouteAdapter';
import { makeCreateSurveyController } from '../factories/controllers/survey/createSurvey/createSurveyControllerFactory';
import { makeAuthMiddleware } from '../factories/middlewares/authMiddlewareFactory';

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'));
  router.post('/surveys', adminAuth, adaptRoute(makeCreateSurveyController()));
};
