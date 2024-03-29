import { adaptMiddleware } from '../adapter/express/expressMiddlewareAdapter';
import { makeAuthMiddleware } from '../factories/middlewares/authMiddlewareFactory';

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'));
