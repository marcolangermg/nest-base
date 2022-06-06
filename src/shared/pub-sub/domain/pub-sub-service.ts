import { ExtendableLogger } from "@app/shared/logger/extendable-logger";
import { QueueEvent } from "@app/shared/queue/application/queue-event";
import { PubSubSubscription } from "@app/shared/pub-sub/application/pub-sub-subscription";
import { QueueTopics } from "@app/shared/queue/domain/queue-topics";

export abstract class PubSubService extends ExtendableLogger {
  public abstract createTopic(topicName: QueueTopics): Promise<void>;

  public abstract subscribe(options: PubSubSubscription): Promise<void>;

  public abstract unsubscribe(subscriptionName: string): Promise<void>;

  public abstract publish(topicName: string, data: QueueEvent): Promise<void>;
}
