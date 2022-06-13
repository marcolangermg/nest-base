import { Event } from "@app/shared/queue/domain/event";
import { QueueTopics } from "@app/shared/queue/domain/queue-topics";

export class CreateAccountEvent implements Event {
  public readonly topicName = QueueTopics.CREATE_ACCOUNT_PROCESS;
  public readonly payload: { [k: string]: string };

  constructor(payload: { [k: string]: string }) {
    this.payload = payload;
  }
}
