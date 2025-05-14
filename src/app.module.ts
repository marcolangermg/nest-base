import { StatusModule } from "@app/status/status.module";
import { SettingsModule } from "@app/settings/settings.module";
import { loggerConfig } from "@app/shared/logger/logger-config";
import { Module } from "@nestjs/common";
import { OrderModule } from "./order/order.module";

@Module({
  imports: [loggerConfig, SettingsModule, StatusModule, OrderModule],
})
export class AppModule {}
