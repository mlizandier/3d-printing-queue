export class UserAlreadyHasAPendingPrintJobError extends Error {
  status = 409;

  constructor(public jobUrl: string) {
    super(jobUrl);
  }
}
