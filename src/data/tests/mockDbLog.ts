import { ILogErrorRepository } from '../protocols/db/log/ILogErrorRepository';

export const mockLogErrorRepository = (): ILogErrorRepository => {
  class LogErrorRepositoryStub implements ILogErrorRepository {
    async logError(stack: string): Promise<void> {
      return Promise.resolve();
    }
  }
  return new LogErrorRepositoryStub();
};
