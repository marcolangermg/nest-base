import { OptionalEnv } from "@app/settings/environment-variables";
import env from "env-var";

export class PubSubSettings {
  public readonly apiEndpoint = env
    .get(OptionalEnv.PUB_SUB_API_ENDPOINT)
    .default("http://pubSub:8085")
    .asUrlString();

  public readonly projectId = env
    .get(OptionalEnv.PUB_SUB_PROJECT_ID)
    .default("dummy-project-id")
    .asString();
}
