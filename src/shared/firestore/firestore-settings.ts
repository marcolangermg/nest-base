import { OptionalEnv } from "@app/settings/environment-variables";
import env from "env-var";

export class FirestoreSettings {
  public readonly apiEndpoint? = env
    .get(OptionalEnv.FIRESTORE_EMULATOR_HOST)
    .asString();

  public readonly projectId = env
    .get(OptionalEnv.FIRESTORE_PROJECT_ID)
    .default("dummy-project-id")
    .asString();
}
