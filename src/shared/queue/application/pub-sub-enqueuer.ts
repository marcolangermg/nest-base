import { REQUEST_SCOPED } from "@app/shared/container/request-scoped";
import { PubSubService } from "@app/shared/pub-sub/domain/pub-sub-service";
import { QueueEvent } from "@app/shared/queue/application/queue-event";
import { EnqueueEvent } from "@app/shared/queue/domain/enqueue-event";
import { Enqueuer } from "@app/shared/queue/domain/enqueuer";
import { QueueTopics } from "@app/shared/queue/domain/queue-topics";
import { Injectable } from "@nestjs/common";

@Injectable(REQUEST_SCOPED)
export class PubSubEnqueuer implements Enqueuer {
  constructor(private readonly pubSubService: PubSubService) {}

  public async publish(
    topicName: QueueTopics,
    data: EnqueueEvent,
  ): Promise<void> {
    const event = new QueueEvent(topicName, data.toEvent());
    await this.pubSubService.publish(topicName, event);
  }
}
