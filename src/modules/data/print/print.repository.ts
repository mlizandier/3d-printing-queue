import { printTable } from 'db/schema';
import { and, eq } from 'drizzle-orm';
import { db } from 'utils/db';
import { CreateJobInput } from './print.types';

export class PrintRepository {
  async getUserPendingJob({ userId }: { userId: string }) {
    const results = await db
      .select()
      .from(printTable)
      .where(
        and(eq(printTable.userId, userId), eq(printTable.status, 'pending')),
      );

    return results.length === 0 ? null : results[0];
  }

  async createJob(input: CreateJobInput) {
    return db.insert(printTable).values({ ...input, status: 'pending' });
  }
}
