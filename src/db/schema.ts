import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const statusEnum = pgEnum('status', [
  'pending',
  'rejected',
  'in_progress',
  'done',
]);

export const printTable = pgTable('print', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: text('user_id').notNull(),
  url: varchar({ length: 2048 }).notNull(),
  description: varchar({ length: 4096 }),
  status: statusEnum(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at')
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
