/* istanbul ignore file */

import { AppSettings } from "@app/settings/app-settings";
import { Injectable } from "@nestjs/common";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

@Injectable()
export class ApplicationSettings {
  @ValidateNested()
  @Type(() => AppSettings)
  public readonly app = new AppSettings();
}
