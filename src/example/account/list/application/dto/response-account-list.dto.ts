import { AccountStatus } from "@app/example/account/shared/entity/account-status.entity";
import { Account } from "@app/example/account/shared/entity/account.entity";
import { BaseResponseDto } from "@app/shared/base-classes/base-response.dto";
import { ApiProperty } from "@nestjs/swagger";

class AccountListDto {
  @ApiProperty({ example: "06aa53b3-8ed1-4ba9-bb9c-16495b5d7f5e" })
  public id!: string;

  @ApiProperty({ example: "John Doe" })
  public name!: string;

  @ApiProperty({ enum: AccountStatus })
  public status!: AccountStatus;

  @ApiProperty({ example: "example@email.com" })
  public email!: string;

  @ApiProperty({ example: "jaoisdjio209asd8718sjd891.asd##" })
  public password!: string;

  @ApiProperty({ example: "2022-01-01T00:00:00.000Z" })
  public createdAt!: string;

  @ApiProperty({ example: "2022-01-01T00:00:00.000Z" })
  public updatedAt!: string;

  constructor(account: Account) {
    this.id = account.id;
    this.name = account.name;
    this.status = account.status;
    this.email = account.email;
    this.password = account.password;
    this.createdAt = account.createdAt.toISOString();
    this.updatedAt = account.updatedAt.toISOString();
  }
}

export class ResponseAccountListDto extends BaseResponseDto {
  @ApiProperty({ isArray: true, type: AccountListDto })
  public accounts!: AccountListDto[];

  public build(accountList: Account[]): ResponseAccountListDto {
    this.accounts = accountList.map((account) => new AccountListDto(account));

    return this;
  }
}
