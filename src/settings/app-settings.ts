import { Env, OptionalEnv } from "@app/settings/environment-variables";
import env from "env-var";

export class AppSettings {
  public readonly name = "Service Name";

  public readonly logLevel = env
    .get(OptionalEnv.LOG_LEVEL)
    .default("debug")
    .asString();

  public readonly enableApiDocumentation = env
    .get(OptionalEnv.ENABLE_API_DOCUMENTATION)
    .default("true")
    .asBool();

  public readonly appListenPort = env
    .get(OptionalEnv.ENABLE_API_DOCUMENTATION)
    .default("3000")
    .asIntPositive();

  public readonly baseUrl = env.get(Env.SERVICE_BASE_URL).asString();
}
