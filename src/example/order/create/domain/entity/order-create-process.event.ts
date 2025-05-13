import { Event, EventPayload } from "@app/shared/queue/domain/event";
import { QueueTopics } from "@app/shared/queue/domain/queue-topics";

interface CreateOrderEventInterface {
  id: string;
  amount: string;
  receivedAt: string;
}

export class OrderCreateProcessEvent implements Event {
  public readonly topicName = QueueTopics.CREATE_ORDER_PROCESS;
  public readonly payload: EventPayload;

  constructor(payload: CreateOrderEventInterface) {
    this.payload = { ...payload, type: typeof OrderCreateProcessEvent };
  }
}
