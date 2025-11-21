import { drizzle } from 'drizzle-orm/node-postgres';
import { secrets } from './secrets';

export const db = drizzle(secrets.DATABASE_URL);
