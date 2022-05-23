import { StatusController } from "@app/health/status.controller";
import { Module } from "@nestjs/common";

@Module({
  controllers: [StatusController],
})
export class HealthModule {}
