import { ApplicationSettings } from "@app/settings/application-settings";
import { REQUEST_SCOPED } from "@app/shared/container/request-scoped";
import { ExtendableLogger } from "@app/shared/logger/extendable-logger";
import { LogLevel } from "@app/shared/logger/logger";
import { PubSubSubscription } from "@app/shared/pub-sub/application/pub-sub-subscription";
import { QueueEvent } from "@app/shared/queue/application/queue-event";
import {
  CreateSubscriptionResponse,
  CreateTopicResponse,
  PubSub,
} from "@google-cloud/pubsub";
import { Injectable } from "@nestjs/common";

@Injectable(REQUEST_SCOPED)
export class PubSubHttpClient extends ExtendableLogger {
  private pubSub: PubSub;

  constructor(private readonly settings: ApplicationSettings) {
    super(PubSubHttpClient.name);

    this.pubSub = new PubSub({
      apiEndpoint: settings.pubSub.apiEndpoint,
      projectId: settings.pubSub.projectId,
    });

    this.log("PubSub Settings", settings.pubSub, LogLevel.DEBUG);
  }

  public async createTopic(topicName: string): Promise<CreateTopicResponse> {
    return await this.pubSub.createTopic(topicName);
  }

  public async subscribe(
    options: PubSubSubscription,
  ): Promise<CreateSubscriptionResponse> {
    return await this.pubSub.createSubscription(
      options.subscriptionName,
      options.topic,
      options,
    );
  }

  public async unsubscribe(subscriptionName: string): Promise<void> {
    await this.pubSub.subscription(subscriptionName).delete();
  }

  public async publish(topicName: string, data: QueueEvent): Promise<void> {
    await this.pubSub
      .topic(topicName)
      .publishMessage({ attributes: data.data });
  }
}
