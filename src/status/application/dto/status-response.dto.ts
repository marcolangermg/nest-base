import { BaseResponseDto } from "@app/shared/base-classes/base-response.dto";
import { ApiProperty } from "@nestjs/swagger";

export class StatusResponseDto extends BaseResponseDto {
  @ApiProperty()
  public status!: boolean;

  build(props: boolean): StatusResponseDto {
    this.status = props as boolean;

    return this;
  }
}
