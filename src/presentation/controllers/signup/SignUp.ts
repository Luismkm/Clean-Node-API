import {
  IHttpRequest,
  IHttpResponse,
  IController,
  ICreateAccount,
  IValidation,
} from './signupProtocols';
import { badRequest, serverError, success } from '../../helpers/http-helper';

export class SignUpController implements IController {
  private readonly createAccount: ICreateAccount

  private readonly validation: IValidation

  constructor(
    createAccount: ICreateAccount,
    validation: IValidation,
  ) {
    this.createAccount = createAccount;
    this.validation = validation;
  }

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

      return success(account);
    } catch (error) {
      return serverError(error);
    }
  }
}
