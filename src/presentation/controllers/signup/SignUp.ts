import { EmailInUseError } from '../../errors';
import {
  badRequest,
  forbidden,
  serverError,
  success,
} from '../../helpers/http-helper';

import { IValidation } from '../../protocols/IValidation';
import {
  IHttpRequest,
  IHttpResponse,
  IController,
  ICreateAccount,
  IAuthentication,
} from './signupProtocols';

export class SignUpController implements IController {
  constructor(
    private readonly createAccount: ICreateAccount,
    private readonly validation: IValidation,
    private readonly authentication: IAuthentication,
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);

      if (error) {
        return badRequest(error);
      }

      const { name, email, password } = httpRequest.body;

      const account = await this.createAccount.create({
        name,
        email,
        password,
      });

      if (!account) {
        return forbidden(new EmailInUseError());
      }

      const accessToken = await this.authentication.auth({
        email,
        password,
      });

      return success({ accessToken });
    } catch (error) {
      return serverError(error);
    }
  }
}
