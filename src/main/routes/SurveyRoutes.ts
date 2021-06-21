import { Router } from 'express';

import { adaptRoute } from '../adapter/express/expressRouteAdapter';
import { makeCreateSurveyController } from '../factories/controllers/survey/createSurvey/createSurveyControllerFactory';

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeCreateSurveyController()));
};
