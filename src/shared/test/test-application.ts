import { Test, TestingModule } from "@nestjs/testing";

import { AppModule } from "@app/app.module";
import { INestApplication } from "@nestjs/common";
import { configSettings } from "@app/nest.settings";
import {
  ApplicationSettingsCustom,
  RecursivePartial,
} from "@app/shared/test/application-settings-custom";
import { ApplicationSettings } from "@app/settings/application-settings";
import { Logger } from "@app/shared/logger/logger";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type NestJsModule = any;

interface TestApplicationData {
  app: INestApplication;
}

export class TestApplication {
  private readonly applicationSettings = new ApplicationSettingsCustom();
  private app?: INestApplication;
  private customSettings?: RecursivePartial<ApplicationSettings>;
  private readonly modules: Array<NestJsModule> = [];

  public setCustomSettings(
    customSettings?: RecursivePartial<ApplicationSettings>,
  ): TestApplication {
    this.customSettings = customSettings;

    return this;
  }

  public async run(
    cb: (appData: TestApplicationData) => Promise<void>,
  ): Promise<void> {
    try {
      await this.setUp();

      await cb({
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        app: this.app!,
      });
    } finally {
      await this.cleanUp();
    }
  }

  private async cleanUp(): Promise<void> {
    await Promise.all([Logger.debug("Cleaning up...", TestApplication.name)]);
  }

  private logCleanUpError(resource: string): (err: Error) => void {
    return (err: Error) => {
      Logger.error(`Error cleaning up: ${resource}`, TestApplication.name, {
        err,
      });
    };
  }

  private async setUp(): Promise<void> {
    this.applyCustomSettings();
    await this.buildApp();
  }

  public addModule(module: NestJsModule): TestApplication {
    this.modules.push(module);

    return this;
  }

  private applyCustomSettings(): void {
    if (this.customSettings) {
      this.applicationSettings.setCustomSettings(this.customSettings);
    }
  }

  private async buildApp(): Promise<void> {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ...this.modules],
    })
      .overrideProvider(ApplicationSettings)
      .useValue(this.applicationSettings)
      .compile();

    const app = moduleFixture.createNestApplication();

    configSettings(app);

    await app.init();

    this.app = app;
  }
}
