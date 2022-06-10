import { AccountListFilter } from "@app/example/account/list/domain/entity/account-list-filter";
import { AccountStatus } from "@app/example/account/shared/entity/account-status.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";

export class RequestAccountListDto {
  @ApiProperty()
  @IsString()
  public readonly name?: string;

  @ApiProperty()
  @IsEmail()
  public readonly email?: string;

  @ApiProperty({ enum: AccountStatus })
  public readonly status?: AccountStatus;

  public toAccountListFilter(): AccountListFilter {
    return {
      name: this.name,
      email: this.email,
      status: this.status,
    };
  }
}
