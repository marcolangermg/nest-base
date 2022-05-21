import { ApplicationSettings } from "@app/settings/application-settings";
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
    console.log("Invalid system configuration", {
      validationResult: validationErrors,
    });
    process.exit(1);
  }
  console.log("System configuration is valid");
};
