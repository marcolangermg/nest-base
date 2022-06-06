import { ExtendableLogger } from "@app/shared/logger/extendable-logger";

export abstract class BaseTestApplication<T> extends ExtendableLogger {
  public abstract setUp(): Promise<T>;
  public abstract cleanUp(): Promise<void>;
}
