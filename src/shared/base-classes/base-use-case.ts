import { ExtendableLogger } from "@app/shared/logger/extendable-logger";

export abstract class BaseUseCase extends ExtendableLogger {
  public abstract execute(input: unknown): unknown;
}
