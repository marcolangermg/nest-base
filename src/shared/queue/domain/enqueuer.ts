import { Event } from "@app/shared/queue/domain/event";

export abstract class Enqueuer {
  public abstract publish(event: Event): Promise<void>;
}
