import { ApplicationSettings } from "@app/settings/application-settings";
import { REQUEST_SCOPED } from "@app/shared/container/request-scoped";
import { PubSubHttpClient } from "@app/shared/pub-sub/application/pub-sub-http-client";
import { queueEventDtoList } from "@app/shared/queue/application/dto/queue-event-dto-list";
import { Enqueuer } from "@app/shared/queue/domain/enqueuer";
import { Event } from "@app/shared/queue/domain/event";
import { Injectable } from "@nestjs/common";

@Injectable(REQUEST_SCOPED)
export class PubSubEnqueuer extends PubSubHttpClient implements Enqueuer {
  constructor(protected readonly settings: ApplicationSettings) {
    super(settings);
  }

  public async publish(event: Event): Promise<void> {
    this.validateEvent(event);

    await this.publishMessage(event.topicName, event.payload);
  }

  private validateEvent(event: Event): void {
    const zodObject = queueEventDtoList[event.topicName];

    zodObject.parse(event.payload);
  }
}
