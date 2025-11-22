import { PrintRepository } from 'modules/data/print/print.repository';
import {
  PendingPrintJobNotFoundError,
  UserAlreadyHasAPendingPrintJobError,
} from './print.exceptions';
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

  async getUserPrintPosition(userId: string) {
    const pendingJobs = await this.printRepository.getPendingJobs();

    const position = pendingJobs.findIndex((job) => job.userId === userId);

    if (position === -1) {
      throw new PendingPrintJobNotFoundError();
    }

    return position + 1;
  }
}
