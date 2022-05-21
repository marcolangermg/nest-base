import { ApplicationSettings } from "@app/settings/application-settings";
import { Global, Module } from "@nestjs/common";

@Global()
@Module({
  providers: [ApplicationSettings],
  exports: [ApplicationSettings],
})
export class SettingsModule {}
