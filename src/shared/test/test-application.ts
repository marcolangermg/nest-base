import { ApplicationSettings } from "@app/settings/application-settings";
import { ExtendableLogger } from "@app/shared/logger/extendable-logger";
import {
  ApplicationSettingsCustom,
  RecursivePartial,
} from "@app/shared/test/application-settings-custom";
import { NestTestApplication } from "@app/shared/test/nest-test-application";
import { PubSubQueueTestApplication } from "@app/shared/test/pub-sub-queue-test-application";
import { INestApplication } from "@nestjs/common";
import { v4 } from "uuid";

/* istanbul ignore file */
interface TestApplicationData {
  app: INestApplication;
  pubSubQueue?: PubSubQueueTestApplication;
}

interface TestApplicationOptions {
  customSettings?: RecursivePartial<ApplicationSettings>;
  buildPubSubQueue?: boolean;
  overrideProviderList?: [{ original: unknown; override: unknown }];
}

/* istanbul ignore file */
export class TestApplication extends ExtendableLogger {
  private readonly applicationSettings = new ApplicationSettingsCustom();
  private nestTestApplication!: NestTestApplication;
  private pubSubQueue?: PubSubQueueTestApplication;

  constructor(private readonly options: TestApplicationOptions) {
    super(TestApplication.name);
  }

  public async run(
    cb: (appData: TestApplicationData) => Promise<void>,
  ): Promise<void> {
    try {
      await this.setUp();

      await cb({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        app: this.nestTestApplication.app!,
        pubSubQueue: this.pubSubQueue,
      });
    } finally {
      await this.cleanUp();
    }
  }

  private async setUp(): Promise<void> {
    if (this.options.customSettings) {
      this.applicationSettings.setCustomSettings(this.options.customSettings);
    }

    await this.configApp();

    if (this.options.buildPubSubQueue === true) {
      this.applicationSettings.setCustomSettings({
        pubSub: { projectId: v4() },
      });

      this.pubSubQueue = await new PubSubQueueTestApplication(
        this.applicationSettings,
      ).setUp();
    }
  }

  private async configApp(): Promise<void> {
    this.nestTestApplication = new NestTestApplication(
      this.applicationSettings,
    );
    this.options.overrideProviderList?.forEach(({ original, override }) => {
      this.nestTestApplication.setOverrideProvider(original, override);
    });

    await this.nestTestApplication.setUp();
  }

  private async cleanUp(): Promise<void> {
    await Promise.all([
      await this.nestTestApplication?.cleanUp(),
      await this.pubSubQueue?.cleanUp(),
    ]);
  }
}
