import { LogMongoRepository } from '../../../infra/database/mongodb/logRepository/log';
import { LogControllerDecorator } from '../../decorators/LogControllerDecorator';

import { IController } from '../../../presentation/protocols';

export const makeLogControllerDecorator = (controller: IController): IController => {
  const logMongoRepository = new LogMongoRepository();
  return new LogControllerDecorator(controller, logMongoRepository);
};
