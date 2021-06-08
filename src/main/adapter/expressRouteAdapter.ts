import { Request, Response } from 'express';
import { IController, IHttpRequest } from '../../presentation/protocols';

export const adaptRoute = (controller: IController) => async (req: Request, res: Response) => {
  const httpRequest: IHttpRequest = {
    body: req.body,
  };

  const IHttpResponse = await controller.handle(httpRequest);
  res.status(IHttpResponse.statusCode).json(IHttpResponse.body);
};
