import { Account } from "@app/example/account/shared/entity/account.entity";
import { BaseResponseDto } from "@app/shared/base-classes/base-response.dto";
import { ApiProperty } from "@nestjs/swagger";

export class ResponseAccountCreateDto extends BaseResponseDto {
  @ApiProperty()
  public id!: string;

  @ApiProperty()
  public name!: string;

  public build(account: Account): ResponseAccountCreateDto {
    this.id = account.id;
    this.name = account.name;

    return this;
  }
}
