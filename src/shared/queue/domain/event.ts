import { QueueTopics } from "@app/shared/queue/domain/queue-topics";

export interface Event {
  readonly topicName: QueueTopics;
  readonly payload: { [k: string]: string };
}
