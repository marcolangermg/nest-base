import { REQUEST_SCOPED } from "@app/shared/container/request-scoped";
import { QueueEvent } from "@app/shared/queue/application/queue-event";
import { PubSubHttpClient } from "@app/shared/pub-sub/application/pub-sub-http-client";
import { PubSubSubscription } from "@app/shared/pub-sub/application/pub-sub-subscription";
import { QueueTopics } from "@app/shared/queue/domain/queue-topics";
import { PubSubService } from "@app/shared/pub-sub/domain/pub-sub-service";
import { Injectable } from "@nestjs/common";
import { LogLevel } from "@app/shared/logger/logger";

@Injectable(REQUEST_SCOPED)
export class PubSubHttpService extends PubSubService {
  constructor(private readonly pubSubClient: PubSubHttpClient) {
    super(PubSubHttpService.name);
  }

  public async createTopic(topicName: QueueTopics): Promise<void> {
    this.log("CreateTopic", topicName, LogLevel.DEBUG);

    await this.pubSubClient.createTopic(topicName);
  }

  public async deleteTopic(topicName: QueueTopics): Promise<void> {
    this.log("DeleteTopic", topicName, LogLevel.DEBUG);

    await this.pubSubClient.deleteTopic(topicName);
  }

  public async subscribe(options: PubSubSubscription): Promise<void> {
    this.log("Subscribing", options, LogLevel.DEBUG);

    await this.pubSubClient.subscribe(options);
  }

  public async unsubscribe(subscriptionName: string): Promise<void> {
    this.log("Unsubscribing", subscriptionName, LogLevel.DEBUG);

    await this.pubSubClient.unsubscribe(subscriptionName);
  }

  public async publish(topicName: string, data: QueueEvent): Promise<void> {
    this.log("Publishing", data, LogLevel.DEBUG);

    await this.pubSubClient.publish(topicName, data);
  }
}
