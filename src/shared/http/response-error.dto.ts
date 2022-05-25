import { ErrorCode } from "@app/shared/http/error-code";
import { ApiProperty } from "@nestjs/swagger";

abstract class ErrorCodeDto {
  @ApiProperty()
  abstract code: string;

  @ApiProperty()
  abstract description: string;
}
export class ResponseErrorDto {
  @ApiProperty({ type: ErrorCodeDto })
  public readonly error: ErrorCode;

  constructor(error: ErrorCode) {
    this.error = error;
  }
}
