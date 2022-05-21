import { HealthModule } from "@app/health/health.module";
import { SettingsModule } from "@app/settings/settings.module";
import { loggerConfig } from "@app/shared/logger/logger-config";
import { Module } from "@nestjs/common";

@Module({
  imports: [loggerConfig, SettingsModule, HealthModule],
})
export class AppModule {}
