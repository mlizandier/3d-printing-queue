import { AuthService } from 'modules/auth/auth.service';
import { ApiKeyRepository } from 'modules/data/api-key/api-key.repository';
import { parseArgs } from 'util';

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    name: {
      type: 'string',
    },
  },
  strict: true,
  allowPositionals: true,
});

async function createApiKey(name: string) {
  const authService = new AuthService(new ApiKeyRepository());

  return authService.registerKey(name);
}

async function main() {
  if (values.name) {
    const apiKey = await createApiKey(values.name);
    console.log(apiKey);
  }
}

main();
