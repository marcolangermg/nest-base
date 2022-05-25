import { StatusController } from "@app/status/application/status.controller";
import { Module } from "@nestjs/common";

@Module({
  controllers: [StatusController],
})
export class StatusModule {}
