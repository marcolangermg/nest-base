import { Order } from "@app/order/shared/entity/order.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";
import { v4 } from "uuid";

export class RequestOrderCreateDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  public readonly amount!: number;

  public toOrder(): Order {
    return new Order({
      id: v4(),
      amount: this.amount,
      receivedAt: new Date(),
    });
  }
}
