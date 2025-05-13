import { ApplicationSettings } from "@app/settings/application-settings";
import { Injectable, OnModuleInit } from "@nestjs/common";
import { PubSubHttpClient } from "@app/shared/pub-sub/application/pub-sub-http-client";
import { QueueTopics } from "@app/shared/queue/domain/queue-topics";
import { pubSubSubscriptionList } from "@app/shared/pub-sub/test/pub-sub-subscription-list";
import { ExtendableLogger } from "@app/shared/logger/extendable-logger";

@Injectable()
export class PubSubQueueInitializer extends ExtendableLogger implements OnModuleInit {
  private readonly pubSubHttpClient: PubSubHttpClient;

  constructor(private readonly settings: ApplicationSettings) {
    super(PubSubQueueInitializer.name);
    this.pubSubHttpClient = new PubSubHttpClient(settings);
  }

  public async onModuleInit(): Promise<void> {
    await this.createTopics();
    await this.subscribeToQueue();
  }

  private async createTopics(): Promise<void> {
    const topics = Object.values(QueueTopics);
    this.log(`Creating ${topics.length} topics`);
    
    await Promise.all(
      topics.map(async (topic) => {
        try {
          await this.pubSubHttpClient.createTopic(topic);
          this.log(`Topic ${topic} created successfully`);
        } catch (error: any) {
          if (error.code === 6) { // ALREADY_EXISTS
            this.log(`Topic ${topic} already exists`);
          } else {
            this.log(`Error creating topic ${topic}: ${error.message}`, error);
            throw error;
          }
        }
      }),
    );
  }

  private async subscribeToQueue(): Promise<void> {
    this.log(`Subscribing to ${pubSubSubscriptionList.length} queues`);
    
    await Promise.all(
      pubSubSubscriptionList.map(async (subscription) => {
        try {
          const subscriptionOptions = {
            topic: subscription.topic,
            subscriptionName: subscription.subscriptionName,
            ackDeadlineSeconds: subscription.ackDeadlineSeconds,
            retainAckedMessages: subscription.retainAckedMessages,
            retryPolicy: {
              minimumBackoff: { seconds: 0 },
              maximumBackoff: { seconds: 10 }
            },
            ...(subscription.deadLetterPolicy ? { deadLetterPolicy: subscription.deadLetterPolicy } : {}),
            pushConfig: subscription.pushConfig,
          };
          
          await this.pubSubHttpClient.subscribe(subscriptionOptions);
          this.log(`Subscribed to ${subscription.subscriptionName} successfully`);
        } catch (error: any) {
          if (error.code === 6) { // ALREADY_EXISTS
            this.log(`Subscription ${subscription.subscriptionName} already exists`);
          } else {
            this.log(`Error subscribing to ${subscription.subscriptionName}: ${error.message}`, error);
            throw error;
          }
        }
      }),
    );
  }
}
