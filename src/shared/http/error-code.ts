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
};
