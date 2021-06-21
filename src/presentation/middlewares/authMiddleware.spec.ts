import { AccessDeniedError } from '../errors';
import { forbidden } from '../helpers/http/http-helper';
import { AuthMiddleware } from './AuthMiddleware';

describe('Auth Middleware', () => {
  it('Should return 403 if no x-access-token exists in headers', async () => {
    const sut = new AuthMiddleware();
    const httpResponse = await sut.handle({});
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()));
  });
});
