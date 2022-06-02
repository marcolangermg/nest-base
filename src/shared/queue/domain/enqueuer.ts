import { EnqueueEvent } from "@app/shared/queue/domain/enqueue-event";
import { QueueTopics } from "@app/shared/queue/domain/queue-topics";

export abstract class Enqueuer {
  public abstract publish(
    topicName: QueueTopics,
    data: EnqueueEvent,
  ): Promise<void>;
}
