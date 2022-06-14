import { QueueTopics } from "@app/shared/queue/domain/queue-topics";

export type EventPayload = Record<string, string> & { type: string };

export interface Event {
  readonly topicName: QueueTopics;
  readonly payload: EventPayload;
}
