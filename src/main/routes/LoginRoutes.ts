import { Router } from 'express';
import { adaptRoute } from '../adapter/express/expressRouteAdapter';

import { makeLoginController } from '../factories/controllers/login/login/loginControllerFactory';
import { makeSignUpController } from '../factories/controllers/login/signup/signupControllerFactory';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
  router.post('/login', adaptRoute(makeLoginController()));
};
