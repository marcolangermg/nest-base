export class ErrorCode {
  constructor(
    public readonly code: string,
    public readonly description: string,
  ) {}
}

const buildError = (code: string, description: string): ErrorCode =>
  new ErrorCode(code, description);

export const ErrorCodeList = {
  ACCOUNT_NOT_FOUND: buildError("ACCOUNT_NOT_FOUND", "Account not found"),
  CREATE_ACCOUNT_NAME_TOO_SHORT: buildError(
    "CREATE_ACCOUNT_NAME_TOO_SHORT",
    "Account name must have more than 3 characters",
  ),
  CREATE_ACCOUNT_EMAIL_EXISTS: buildError(
    "CREATE_ACCOUNT_EMAIL_EXISTS",
    "Email must be unique",
  ),
};
