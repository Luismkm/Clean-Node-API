import { ServerError } from '../errors/ServerError';
import { IHttpResponse } from '../protocols/IHttp';

export const badRequest = (error: Error): IHttpResponse => ({
  statusCode: 400,
  body: error,
});

export const serverError = (): IHttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});