import { ApplicationSettings } from "@app/settings/application-settings";
import { Logger } from "@app/shared/logger/logger";
import { plainToClass } from "class-transformer";
import { validateSync } from "class-validator";

export const validateSettings = (): void => {
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
    Logger.error("Invalid system configuration", "validateSettings", {
      validationResult: validationErrors,
    });
    process.exit(1);
  }

  Logger.error("Invalid system configuration", "validateSettings");
};
