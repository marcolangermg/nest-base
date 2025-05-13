import { BaseResponseDto } from "@app/shared/base-classes/base-response.dto";
import { ApiProperty } from "@nestjs/swagger";

export class AsyncResponseOrderCreateDto extends BaseResponseDto {
  @ApiProperty()
  public enqueued!: boolean;

  public build(): AsyncResponseOrderCreateDto {
    this.enqueued = true;

    return this;
  }
}
