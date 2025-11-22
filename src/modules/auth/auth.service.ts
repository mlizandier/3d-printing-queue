import { ApiKeyRepository } from 'modules/data/api-key/api-key.repository';
import { randomBytes } from 'node:crypto';
import { secrets } from 'utils/secrets';
import {
  ApiKeyNameAlreadyTakenError,
  InvalidApiKeyError,
} from './api-key.exception';

export class AuthService {
  constructor(private readonly apiKeyRepository: ApiKeyRepository) {}

  private static hashApiKey(apiKey: string) {
    const hasher = new Bun.CryptoHasher('sha256', secrets.HASH_SECRET_KEY);
    hasher.update(apiKey);
    return hasher.digest('hex');
  }

  async isAuthorized(apiKey: string) {
    const hash = AuthService.hashApiKey(apiKey);

    const key = await this.apiKeyRepository.getKeyByHash(hash);
    return key && key.length > 0;
  }

  async registerKey(name: string) {
    const randomString = randomBytes(32).toString('hex');
    const hash = AuthService.hashApiKey(randomString);

    const existingApiKey = await this.apiKeyRepository.getKeyByName(name);
    if (existingApiKey.length > 0) {
      throw new ApiKeyNameAlreadyTakenError();
    }

    await this.apiKeyRepository.createKey({ name, apiKeyHash: hash });
    return { apiKey: randomString };
  }

  async verifyApiKey(request: Request) {
    const apiKey = request.headers.get('x-api-key');

    if (!apiKey) {
      throw new InvalidApiKeyError();
    }

    const isAuthorized = await this.isAuthorized(apiKey);

    if (!isAuthorized) {
      throw new InvalidApiKeyError();
    }
  }
}
