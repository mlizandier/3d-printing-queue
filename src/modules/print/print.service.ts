import { PrintRepository } from 'modules/data/print/print.repository';
import { UserAlreadyHasAPendingPrintJobError } from './print.exceptions';
import { CreatePrintJobType } from './print.types';

export class PrintService {
  constructor(private readonly printRepository: PrintRepository) {}

  private async getUserPendingJob(userId: string) {
    const pendingJob = await this.printRepository.getUserPendingJob({ userId });
    return pendingJob;
  }

  async createPrintJob({ userId, ...rest }: CreatePrintJobType) {
    const userPendingPrintJob = await this.getUserPendingJob(userId);

    if (userPendingPrintJob !== null) {
      throw new UserAlreadyHasAPendingPrintJobError(userPendingPrintJob.url);
    }
    return this.printRepository.createJob({ ...rest, userId });
  }
}
