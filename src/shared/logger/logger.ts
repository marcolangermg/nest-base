import { config } from "@app/settings/application-config";
import { Logger as NestLogger } from "@nestjs/common";

export enum LogLevel {
  INFO = "log",
  DEBUG = "debug",
  ERROR = "error",
  WARN = "warn",
}

export interface LogInterface {
  message: string;
  context: string;
  level?: LogLevel;
  logData?: unknown;
}

export class Logger {
  private static logger = new NestLogger(config.app.name);

  public static log(params: LogInterface): void {
    const { message, logData, context, level = LogLevel.INFO } = params;

    this.logger[level]({ message, logData }, context);
  }
}
