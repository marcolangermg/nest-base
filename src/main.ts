import { NestSettings } from "@app/nest.settings";
import { config } from "@app/settings/application-config";
import { INestApplication } from "@nestjs/common";

let app: INestApplication;

async function bootstrap() {
  app = await NestSettings.createApp();

  await app.listen(config.app.appListenPort);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
