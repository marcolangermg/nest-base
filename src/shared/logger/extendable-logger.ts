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

  public log(message: string, logData?: unknown): void;
  public log(message: string, logData?: unknown, level?: LogLevel): void;

  public log(message: string, logData?: unknown, level?: LogLevel): void {
    Logger.log({
      message,
      logData,
      level: level ?? LogLevel.INFO,
      context: this.context,
    });
  }
}
