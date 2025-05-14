import { OrderListFilter } from "@app/order/shared/entity/order-list-filter";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, Min } from "class-validator";

export class RequestOrderListDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public readonly id?: string;

  @ApiProperty({ required: false })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  public readonly amount?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  public readonly receivedAt?: Date;

  @ApiProperty({ required: false })
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  public readonly limit?: number;

  public toOrderListFilter(): OrderListFilter {
    return {
      id: this.id,
      amount: this.amount,
      receivedAt: this.receivedAt,
      limit: this.limit,
    };
  }
}
