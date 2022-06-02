/* istanbul ignore file */

import { AppSettings } from "@app/settings/app-settings";
import { PubSubSettings } from "@app/shared/pub-sub/domain/pub-sub-settings";
import { Injectable } from "@nestjs/common";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

@Injectable()
export class ApplicationSettings {
  @ValidateNested()
  @Type(() => AppSettings)
  public readonly app = new AppSettings();

  @ValidateNested()
  @Type(() => PubSubSettings)
  public readonly pubSub = new PubSubSettings();
}
