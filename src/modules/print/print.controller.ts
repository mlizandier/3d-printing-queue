import { Elysia } from 'elysia';
import { PrintRepository } from 'modules/data/print/print.repository';
import { UserAlreadyHasAPendingPrintJobError } from './print.exceptions';
import { PrintService } from './print.service';
import { createPrintJobSchema } from './print.types';

const printRepository = new PrintRepository();
const printService = new PrintService(printRepository);

export const PrintRequestController = new Elysia({
  prefix: '/print',
})
  .error({
    UserAlreadyHasAPendingPrintJobError,
  })
  .onError(({ code, error, status }) => {
    switch (code) {
      case 'UserAlreadyHasAPendingPrintJobError':
        return status(
          error.status,
          `User already has a pending print job : ${error.jobUrl}`,
        );
    }
  })
  .post(
    '/',
    async ({ body, status }) => {
      await printService.createPrintJob(body);
      return status(201);
    },
    {
      body: createPrintJobSchema,
    },
  );
