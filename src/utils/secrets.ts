type Secrets = {
  DATABASE_URL: string;
  HASH_SECRET_KEY: string;
};

export const secrets: Secrets = {
  DATABASE_URL: Bun.env['DATABASE_URL']!,
  HASH_SECRET_KEY: Bun.env['HASH_SECRET_KEY']!,
} as const;
