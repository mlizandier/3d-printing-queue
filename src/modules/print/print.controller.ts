import { Elysia } from 'elysia';
import { InvalidApiKeyError } from 'modules/auth/api-key.exception';
import { AuthService } from 'modules/auth/auth.service';
import { ApiKeyRepository } from 'modules/data/api-key/api-key.repository';
import { PrintRepository } from 'modules/data/print/print.repository';
import { UserAlreadyHasAPendingPrintJobError } from './print.exceptions';
import { PrintService } from './print.service';
import { createPrintJobSchema } from './print.types';

const printRepository = new PrintRepository();
const apiKeyRepository = new ApiKeyRepository();

const printService = new PrintService(printRepository);
const authService = new AuthService(apiKeyRepository);

export const PrintRequestController = new Elysia({
  prefix: '/prints',
})
  .onRequest(async ({ request }) => authService.verifyApiKey(request))
  .error({
    UserAlreadyHasAPendingPrintJobError,
    InvalidApiKeyError,
  })
  .onError(({ code, error, status }) => {
    switch (code) {
      case 'InvalidApiKeyError':
        return status(error.status);
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
  )
  .get('/:userId', async ({ params: { userId }, status }) => {
    const printPosition = await printService.getUserPrintPosition(userId);

    return status(200, { position: printPosition });
  });
