import { BaseResponseDto } from "@app/shared/base-classes/base-response.dto";
import { ApiProperty } from "@nestjs/swagger";

export class AsyncResponseCreateAccountDto extends BaseResponseDto {
  @ApiProperty()
  public enqueued!: boolean;

  public build(): AsyncResponseCreateAccountDto {
    this.enqueued = true;

    return this;
  }
}
