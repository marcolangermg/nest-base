import { INestApplication } from "@nestjs/common";
import { NestSettings } from "@app/nest.settings";
import { get } from "env-var";
import { OptionalEnv } from "@app/settings/environment-variables";

let app: INestApplication;

async function bootstrap() {
  app = await NestSettings.createApp();

  await app.listen(
    get(OptionalEnv.APP_LISTEN_PORT).default("3000").asIntPositive(),
  );
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
