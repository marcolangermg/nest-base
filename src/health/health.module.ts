import { StatusController } from "@app/health/status.controller";
import { MambuTestService, TestService } from "@app/health/test";
import { provideClass } from "@app/shared/container/provide-class";
import { Module } from "@nestjs/common";

@Module({
  controllers: [StatusController],
  providers: [provideClass(TestService, MambuTestService)],
})
export class HealthModule {}
