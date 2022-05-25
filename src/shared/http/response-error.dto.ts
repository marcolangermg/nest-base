import { ErrorCode } from "@app/shared/http/error-code";
import { ApiProperty } from "@nestjs/swagger";

export class ResponseErrorDto {
  @ApiProperty({ type: ErrorCode })
  public readonly error: ErrorCode;

  constructor(error: ErrorCode) {
    this.error = error;
  }
}
