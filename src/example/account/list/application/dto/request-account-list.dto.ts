import { AccountListFilter } from "@app/example/account/shared/entity/account-list-filter";
import { AccountStatus } from "@app/example/account/shared/entity/account-status.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEmail, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class RequestAccountListDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  public readonly name?: string;

  @ApiProperty({ required: false })
  @IsEmail()
  @IsOptional()
  public readonly email?: string;

  @ApiProperty({ enum: AccountStatus, required: false })
  @IsOptional()
  public readonly status?: AccountStatus;

  @ApiProperty({ required: false })
  @IsNumber()
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  public readonly limit?: number;

  public toAccountListFilter(): AccountListFilter {
    return {
      name: this.name,
      email: this.email,
      status: this.status,
      limit: this.limit,
    };
  }
}
