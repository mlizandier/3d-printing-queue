import { apiKeyTable } from 'db/schema';
import { eq } from 'drizzle-orm';
import { db } from 'utils/db';
import { CreateApiKey } from './api-key.types';

export class ApiKeyRepository {
  async createKey(input: CreateApiKey) {
    return db.insert(apiKeyTable).values(input);
  }

  async getKeyByHash(hash: string) {
    return db
      .select()
      .from(apiKeyTable)
      .where(eq(apiKeyTable.apiKeyHash, hash));
  }

  async getKeyByName(name: string) {
    return db.select().from(apiKeyTable).where(eq(apiKeyTable.name, name));
  }
}
