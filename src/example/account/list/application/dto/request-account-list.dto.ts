import { AccountListFilter } from "@app/example/account/shared/entity/account-list-filter";
import { AccountStatus } from "@app/example/account/shared/entity/account-status.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

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

  public toAccountListFilter(): AccountListFilter {
    return {
      name: this.name,
      email: this.email,
      status: this.status,
    };
  }
}
