import { Order } from "@app/order/shared/entity/order.entity";
import { BaseResponseDto } from "@app/shared/base-classes/base-response.dto";
import { ApiProperty } from "@nestjs/swagger";

class OrderListDto {
  @ApiProperty({ example: "06aa53b3-8ed1-4ba9-bb9c-16495b5d7f5e" })
  public id!: string;

  @ApiProperty({ example: 10 })
  public amount!: number;

  @ApiProperty({ example: "2022-01-01T00:00:00.000Z" })
  public receivedAt!: Date;

  constructor(order: Order) {
    this.id = order.id;
    this.amount = order.amount;
    this.receivedAt = order.receivedAt;
  }
}

export class ResponseOrderListDto extends BaseResponseDto {
  @ApiProperty({ isArray: true, type: OrderListDto })
  public orders!: OrderListDto[];

  public build(orderList: Order[]): ResponseOrderListDto {
    this.orders = orderList.map((order) => new OrderListDto(order));

    return this;
  }
}
