type Secrets = {
  DATABASE_URL: string;
};

export const secrets: Secrets = {
  DATABASE_URL: Bun.env['DATABASE_URL']!,
} as const;
