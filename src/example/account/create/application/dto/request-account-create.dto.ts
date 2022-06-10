import { Account } from "@app/example/account/shared/entity/account.entity";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString } from "class-validator";
import { v4 } from "uuid";

export class RequestAccountCreateDto {
  @ApiProperty()
  @IsString()
  public readonly name!: string;

  @ApiProperty()
  @IsEmail()
  public readonly email!: string;

  @ApiProperty()
  @IsString()
  public readonly password!: string;

  public toAccount(): Account {
    return new Account({
      id: v4(),
      name: this.name,
      email: this.email,
      password: this.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }
}
