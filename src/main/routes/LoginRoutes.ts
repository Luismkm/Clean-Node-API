import { Router } from 'express';
import { adaptRoute } from '../adapter/expressRouteAdapter';
import { makeSignUpController } from '../factories/signup/signup';
import { makeLoginController } from '../factories/login/loginFactory';

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()));
  router.post('/login', adaptRoute(makeLoginController()));
};
