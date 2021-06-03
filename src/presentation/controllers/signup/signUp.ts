import {
  IHttpRequest,
  IHttpResponse,
  IController,
  IEmailValidator,
  ICreateAccount,
} from './signupProtocols';
import { MissingParamError, InvalidParamError, ServerError } from '../../errors';
import { badRequest, serverError } from '../../helpers/http-helper';

export class SignUpController implements IController {
  private readonly emailValidator: IEmailValidator

  private readonly createAccount: ICreateAccount

  constructor(emailValidator: IEmailValidator, createAccount: ICreateAccount) {
    this.emailValidator = emailValidator;
    this.createAccount = createAccount;
  }

  handle(httpRequest: IHttpRequest): IHttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field));
        }
      }

      const {
        name, email, password, passwordConfirmation,
      } = httpRequest.body;

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isValid = this.emailValidator.isValid(email);

      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }

      const account = this.createAccount.create({
        name,
        email,
        password,
      });

      return {
        statusCode: 200,
        body: account,
      };
    } catch (error) {
      return serverError();
    }
  }
}
