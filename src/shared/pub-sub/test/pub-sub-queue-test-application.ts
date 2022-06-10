import { PubSubHttpClient } from "@app/shared/pub-sub/application/pub-sub-http-client";
import { PubSubHttpService } from "@app/shared/pub-sub/application/pub-sub-http-service";
import { pubSubSubscriptionList } from "@app/shared/pub-sub/test/pub-sub-subscription-list";
import { QueueTopics } from "@app/shared/queue/domain/queue-topics";
import { ApplicationSettingsCustom } from "@app/shared/test/application-settings-custom";
import { BaseTestApplication } from "@app/shared/test/base-test-application";
import { INestApplication } from "@nestjs/common";
import axios from "axios";
import request from "supertest";
import { v4 } from "uuid";

/* istanbul ignore file */
export class PubSubQueueTestApplication extends BaseTestApplication<PubSubQueueTestApplication> {
  private readonly pubSubHttpClient: PubSubHttpClient;
  public readonly pubSubHttpService: PubSubHttpService;

  constructor(private readonly settings: ApplicationSettingsCustom) {
    super(PubSubQueueTestApplication.name);
    this.settings.setCustomSettings({
      pubSub: { projectId: v4() },
    });

    this.pubSubHttpClient = new PubSubHttpClient(settings);
    this.pubSubHttpService = new PubSubHttpService(this.pubSubHttpClient);
  }

  public async setUp(): Promise<PubSubQueueTestApplication> {
    await this.createTopics();
    await this.subscribeToQueue();

    return this;
  }

  private async createTopics(): Promise<void> {
    const topics = Object.values(QueueTopics);
    await Promise.all(
      topics.map(async (topic) => {
        await this.pubSubHttpService.createTopic(topic);
      }),
    );
  }

  private async subscribeToQueue(): Promise<void> {
    await Promise.all(
      pubSubSubscriptionList.map(async (subscription) => {
        await this.pubSubHttpService.subscribe({
          ...subscription,
          pushConfig: undefined,
        });
      }),
    );
  }

  public async cleanUp(): Promise<void> {
    await this.unsubscribeToQueue();
  }

  private async unsubscribeToQueue(): Promise<void> {
    await Promise.all(
      pubSubSubscriptionList.map(async (subscription) => {
        await this.pubSubHttpService.unsubscribe(subscription.subscriptionName);
      }),
    );
  }

  public async executeQueue(
    topic: QueueTopics,
    app: INestApplication,
  ): Promise<void> {
    const subscription = pubSubSubscriptionList.find(
      (sb) => sb.topic === topic,
    );

    if (subscription === undefined) {
      throw new Error(`Subscription for topic ${topic} not found`);
    }

    const endpoint = subscription.httpRoute;
    if (endpoint === undefined) {
      throw Error("No endpoint found");
    }

    const messages = await this.pullSubscription(
      subscription.subscriptionName,
      1,
    );

    const message = messages[0];

    if (message === undefined) {
      throw new Error(`No messages found for topic ${topic}`);
    }

    await request(app.getHttpServer())
      .post(endpoint)
      .send(message as string)
      .expect(201);
  }

  private async pullSubscription(
    subscriptionName: string,
    maxMessages: number,
  ): Promise<unknown[]> {
    const endpoint = this.settings.pubSub.apiEndpoint;

    const result = await axios.post(
      `${endpoint}v1/projects/${this.settings.pubSub.projectId}/subscriptions/${subscriptionName}:pull`,
      {
        returnImmediately: false,
        maxMessages: maxMessages,
      },
    );

    return result.data.receivedMessages;
  }
}
