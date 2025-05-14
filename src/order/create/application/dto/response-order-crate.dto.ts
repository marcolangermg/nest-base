import { Order } from "@app/order/shared/entity/order.entity";
import { BaseResponseDto } from "@app/shared/base-classes/base-response.dto";
import { ApiProperty } from "@nestjs/swagger";

export class ResponseOrderCreateDto extends BaseResponseDto {
  @ApiProperty()
  public id!: string;

  @ApiProperty()
  public amount!: number;

  public build(order: Order): ResponseOrderCreateDto {
    this.id = order.id;
    this.amount = order.amount;

    return this;
  }
}
