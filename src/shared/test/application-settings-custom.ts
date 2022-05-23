import { ApplicationSettings } from "@app/settings/application-settings";
import { merge } from "lodash";

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

export class ApplicationSettingsCustom extends ApplicationSettings {
  public setCustomSettings(
    customSettings?: RecursivePartial<ApplicationSettings>,
  ): void {
    if (customSettings === undefined) {
      return;
    }
    Object.assign(this, merge(this, customSettings));
  }
}
