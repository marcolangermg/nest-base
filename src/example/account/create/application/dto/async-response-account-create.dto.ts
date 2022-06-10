import { BaseResponseDto } from "@app/shared/base-classes/base-response.dto";
import { ApiProperty } from "@nestjs/swagger";

export class AsyncResponseAccountCreateDto extends BaseResponseDto {
  @ApiProperty()
  public enqueued!: boolean;

  public build(): AsyncResponseAccountCreateDto {
    this.enqueued = true;

    return this;
  }
}
