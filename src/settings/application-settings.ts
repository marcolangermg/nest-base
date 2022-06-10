/* istanbul ignore file */

import { AppSettings } from "@app/settings/app-settings";
import { FirestoreSettings } from "@app/shared/firestore/firestore-settings";
import { PubSubSettings } from "@app/shared/pub-sub/domain/pub-sub-settings";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ApplicationSettings {
  public readonly app = new AppSettings();

  public readonly pubSub = new PubSubSettings();

  public readonly firestore = new FirestoreSettings();
}
