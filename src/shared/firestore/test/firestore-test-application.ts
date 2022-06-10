import { ApplicationSettingsCustom } from "@app/shared/test/application-settings-custom";
import { BaseTestApplication } from "@app/shared/test/base-test-application";
import { v4 } from "uuid";

export class FirestoreTestApplication extends BaseTestApplication<FirestoreTestApplication> {
  constructor(private readonly settings: ApplicationSettingsCustom) {
    super(FirestoreTestApplication.name);
  }

  public setUp(): Promise<FirestoreTestApplication> {
    this.settings.setCustomSettings({
      firestore: { projectId: v4() },
    });

    return Promise.resolve(this);
  }
  public cleanUp(): Promise<void> {
    return Promise.resolve();
  }
}
