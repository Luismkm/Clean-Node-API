import { AccessDeniedError } from '../errors';
import { forbidden, success } from '../helpers/http/http-helper';

import { IHttpRequest, IHttpResponse, IMiddleware } from '../protocols';
import { ILoadAccountByToken } from '../../domain/usecases/ILoadAccountByToken';

export class AuthMiddleware implements IMiddleware {
  constructor(
    private readonly loadAccountByToken: ILoadAccountByToken,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const accessToken = httpRequest.headers?.['x-access-token'];
    if (accessToken) {
      const account = await this.loadAccountByToken.load(accessToken);
      if (account) {
        return success({ accountId: account.id });
      }
    }
    return forbidden(new AccessDeniedError());
  }
}
