import { OptionalEnv } from "@app/settings/environment-variables";
import env from "env-var";

export class AppSettings {
  public readonly name = "Service Name";

  public readonly enableApiDocumentation = env
    .get(OptionalEnv.ENABLE_API_DOCUMENTATION)
    .default("true")
    .asBool();
}
