import { IHttpRequest, IHttpResponse } from './IHttp';

export interface IMiddleware {
  handle(httpRequest: IHttpRequest): Promise<IHttpResponse>
}
