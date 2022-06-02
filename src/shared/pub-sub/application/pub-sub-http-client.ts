import { ApplicationSettings } from "@app/settings/application-settings";
import { REQUEST_SCOPED } from "@app/shared/container/request-scoped";
import { QueueEvent } from "@app/shared/queue/application/queue-event";
import { PubSubSubscription } from "@app/shared/pub-sub/application/pub-sub-subscription";
import { QueueTopics } from "@app/shared/queue/domain/queue-topics";
import {
  CreateSubscriptionResponse,
  CreateTopicResponse,
  PubSub,
} from "@google-cloud/pubsub";
import { Injectable } from "@nestjs/common";

@Injectable(REQUEST_SCOPED)
export class PubSubHttpClient {
  private pubSub: PubSub;

  constructor(private readonly settings: ApplicationSettings) {
    this.pubSub = new PubSub({
      apiEndpoint: settings.pubSub.apiEndpoint,
      projectId: settings.pubSub.projectId,
    });
  }

  public async createTopic(
    topicName: QueueTopics,
  ): Promise<CreateTopicResponse> {
    return await this.pubSub.createTopic(topicName);
  }

  public async deleteTopic(topicName: QueueTopics): Promise<void> {
    await this.pubSub.topic(topicName).delete();
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
