import { BaseResponseDto } from "@app/shared/base-classes/base-response.dto";
import { ApiProperty } from "@nestjs/swagger";

export class QueueReceiveDto extends BaseResponseDto {
  @ApiProperty()
  public success!: boolean;

  public build(): QueueReceiveDto {
    this.success = true;

    return this;
  }
}
