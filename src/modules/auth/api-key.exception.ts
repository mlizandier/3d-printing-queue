export class ApiKeyNameAlreadyTakenError extends Error {
  status = 409;
}

export class InvalidApiKeyError extends Error {
  status = 401;
}
