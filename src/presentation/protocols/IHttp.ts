export type IHttpResponse = {
  statusCode: number;
  body: any;
}

export type IHttpRequest = {
  headers?: any;
  body?: any;
  params?: any;
  accountId?: string
}
