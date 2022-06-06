/* istanbul ignore file */
import { AppModule } from "@app/app.module";
import { configSettings } from "@app/nest.settings";
import { ApplicationSettings } from "@app/settings/application-settings";
import { ApplicationSettingsCustom } from "@app/shared/test/application-settings-custom";
import { BaseTestApplication } from "@app/shared/test/base-test-application";
import { INestApplication } from "@nestjs/common";
import { Test, TestingModule, TestingModuleBuilder } from "@nestjs/testing";

export class NestTestApplication extends BaseTestApplication<NestTestApplication> {
  public app?: INestApplication;
  private readonly overrideProviderList: {
    original: unknown;
    override: unknown;
  }[] = [];

  constructor(private readonly applicationSettings: ApplicationSettingsCustom) {
    super(NestTestApplication.name);
  }

  public async setUp(): Promise<NestTestApplication> {
    this.setOverrideProvider(ApplicationSettings, this.applicationSettings);

    return await this.buildApp();
  }

  public setOverrideProvider(original: unknown, override: unknown): void {
    this.overrideProviderList.push({ original, override });
  }

  private async buildApp(): Promise<NestTestApplication> {
    const testingModuleBuilder = Test.createTestingModule({
      imports: [AppModule],
    });

    this.overrideProvider(testingModuleBuilder);

    const moduleFixture: TestingModule = await testingModuleBuilder.compile();

    const app = moduleFixture.createNestApplication();

    configSettings(app);

    await app.init();

    this.app = app;

    return this;
  }

  private overrideProvider(
    testingModuleBuilder: TestingModuleBuilder,
  ): TestingModuleBuilder {
    this.overrideProviderList.forEach(({ original, override }) => {
      testingModuleBuilder.overrideProvider(original).useValue(override);
    });

    return testingModuleBuilder;
  }

  public async cleanUp(): Promise<void> {
    return Promise.resolve();
  }
}
