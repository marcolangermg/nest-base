import { ApplicationSettings } from "@app/settings/application-settings";
import { Logger, LogLevel } from "@app/shared/logger/logger";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";

export const validateSettings = (): void => {
  Logger.log({
    message: "Validating system configuration",
    context: "validateSettings",
  });

  const settings = plainToClass(
    ApplicationSettings,
    new ApplicationSettings(),
    {
      enableImplicitConversion: true,
    },
  );

  const validationErrors = validateSync(settings, {
    validationError: { target: false },
  });

  /* istanbul ignore if */
  if (validationErrors.length > 0) {
    Logger.log({
      message: "Invalid system configuration",
      context: "validateSettings",
      logData: {
        validationResult: validationErrors,
      },
      level: LogLevel.ERROR,
    });
    process.exit(1);
  }

  Logger.log({
    message: "Valid system configuration",
    context: "validateSettings",
  });
};
