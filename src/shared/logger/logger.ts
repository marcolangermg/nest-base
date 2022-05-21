import { config } from "@app/settings/application-config";
import { Logger as NestLogger } from "@nestjs/common";

export class Logger {
  public static logger = new NestLogger(config.app.name);

  public static debug(
    message: string,
    context: string,
    logData?: unknown,
  ): void {
    this.logger.debug({ message, logData }, context);
  }

  public static log(message: string, context: string, logData?: unknown): void {
    this.logger.log({ message, logData }, context);
  }

  public static error(
    message: string,
    context: string,
    logData?: unknown,
  ): void {
    this.logger.error({ message, logData }, context);
  }

  public static warn(
    message: string,
    context: string,
    logData?: unknown,
  ): void {
    this.logger.error({ message, logData }, context);
  }
}
