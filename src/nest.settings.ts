import { AppModule } from "@app/app.module";
import { LoggingInterceptor } from "@app/shared/logger/request-logger-interceptor";
import { swaggerConfig } from "@app/shared/swagger/swagger-config";
import { INestApplication, ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { Logger } from "nestjs-pino";

export const configSettings = (app: INestApplication): void => {
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.useLogger(app.get(Logger));
  swaggerConfig(app);
  app.useGlobalInterceptors(new LoggingInterceptor());
};

export class NestSettings {
  /* istanbul ignore next */
  static createApp = async (): Promise<INestApplication> => {
    const app: INestApplication = await NestFactory.create(AppModule, {
      bufferLogs: true,
    });

    configSettings(app);

    return app;
  };
}
