import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsString } from "class-validator";

export class QueueMessageDto {
  @ApiProperty()
  @IsString()
  public readonly data!: string;

  @ApiProperty()
  @IsString()
  public readonly messageId!: string;

  @ApiProperty()
  attributes: unknown;
}

export class QueueRequestDto {
  @ApiProperty()
  @IsString()
  public readonly subscription!: string;

  @ApiProperty()
  @Type(() => QueueMessageDto)
  public readonly message!: QueueMessageDto;
}
