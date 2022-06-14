import { Event } from "@app/shared/queue/domain/event";
import { QueueTopics } from "@app/shared/queue/domain/queue-topics";

interface CreateAccountEventInterface {
  id: string;
  name: string;
  email: string;
  status: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export class AccountCreateProcessEvent implements Event {
  public readonly topicName = QueueTopics.CREATE_ACCOUNT_PROCESS;
  public readonly payload: Record<string, string>;

  constructor(payload: CreateAccountEventInterface) {
    this.payload = { ...payload };
  }
}
