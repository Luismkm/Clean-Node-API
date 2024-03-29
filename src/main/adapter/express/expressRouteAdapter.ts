import { Request, Response } from 'express';
import { IController, IHttpRequest } from '../../../presentation/protocols';

export const adaptRoute = (controller: IController) => async (req: Request, res: Response) => {
  const httpRequest: IHttpRequest = {
    body: req.body,
    params: req.params,
    accountId: req.accountId,
  };

  const httpResponse = await controller.handle(httpRequest);
  if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
    res.status(httpResponse.statusCode).json(httpResponse.body);
  } else {
    res.status(httpResponse.statusCode).json({
      error: httpResponse.body.message,
    });
  }
};
