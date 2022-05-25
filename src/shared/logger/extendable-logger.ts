import { Logger, LogLevel } from "@app/shared/logger/logger";

export interface ExtendableLoggerInterface {
  message: string;
  level?: LogLevel;
  logData?: unknown;
}

export class ExtendableLogger {
  private readonly context: string;
  constructor(className: string) {
    this.context = className;
  }

  protected log(message: string, logData?: unknown): void;
  protected log(message: string, logData?: unknown, level?: LogLevel): void;

  protected log(message: string, logData?: unknown, level?: LogLevel): void {
    Logger.log({
      message,
      logData,
      level: level ?? LogLevel.INFO,
      context: this.context,
    });
  }
}
