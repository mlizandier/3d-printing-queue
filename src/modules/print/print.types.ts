import z from 'zod';
import { MAX_TEXT_LENGTH } from './print.constants';

export const createPrintJobSchema = z.object({
  userId: z.string(),
  url: z.string().max(MAX_TEXT_LENGTH),
  description: z.string().max(MAX_TEXT_LENGTH).optional(),
});

export type CreatePrintJobType = z.infer<typeof createPrintJobSchema>;
