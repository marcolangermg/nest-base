import { ExampleModule } from "@app/example/example.module";
import { StatusModule } from "@app/status/status.module";
import { SettingsModule } from "@app/settings/settings.module";
import { loggerConfig } from "@app/shared/logger/logger-config";
import { Module } from "@nestjs/common";

@Module({
  imports: [loggerConfig, SettingsModule, StatusModule, ExampleModule],
})
export class AppModule {}
