import {
  IHttpRequest,
  IHttpResponse,
  IController,
  IEmailValidator,
  ICreateAccount,
  IValidation
} from './signupProtocols';
import { MissingParamError, InvalidParamError } from '../../errors';
import { badRequest, serverError, success } from '../../helpers/http-helper';

export class SignUpController implements IController {
  private readonly emailValidator: IEmailValidator
  private readonly createAccount: ICreateAccount
  private readonly validation: IValidation

  constructor(emailValidator: IEmailValidator, createAccount: ICreateAccount, validation: IValidation) {
    this.emailValidator = emailValidator;
    this.createAccount = createAccount;
    this.validation = validation
  }

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
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

      const isValid = await this.emailValidator.isValid(email);

      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }

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
