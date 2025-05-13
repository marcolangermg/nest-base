export class ErrorCode {
  constructor(
    public readonly code: string,
    public readonly description: string,
  ) {}
}

const buildError = (code: string, description: string): ErrorCode =>
  new ErrorCode(code, description);

export const ErrorCodeList = {
  ORDER_NOT_FOUND: buildError("ORDER_NOT_FOUND", "Order not found"),
};
