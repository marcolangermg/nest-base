import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsString } from "class-validator";

export class QueueMessageDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  public readonly data?: string;

  @ApiProperty()
  @IsString()
  public readonly messageId!: string;

  @ApiProperty()
  attributes: unknown;
}

export class QueueRequestDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  public readonly subscription?: string;

  @ApiProperty()
  @Type(() => QueueMessageDto)
  public readonly message!: QueueMessageDto;
}
