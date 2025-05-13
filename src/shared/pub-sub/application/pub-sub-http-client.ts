import { ApplicationSettings } from "@app/settings/application-settings";
import { ExtendableLogger } from "@app/shared/logger/extendable-logger";
import { LogLevel } from "@app/shared/logger/logger";
import {
  CreateSubscriptionOptions,
  CreateSubscriptionResponse,
  CreateTopicResponse,
  PubSub,
} from "@google-cloud/pubsub";

export class PubSubHttpClient extends ExtendableLogger {
  private pubSub: PubSub;

  constructor(settings: ApplicationSettings) {
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
    options: CreateSubscriptionOptions & { subscriptionName: string; topic: string },
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

  public async publishMessage(
    topicName: string,
    attributes: Record<string, string>,
  ): Promise<void> {
    await this.pubSub.topic(topicName).publishMessage({ attributes });
  }
}
