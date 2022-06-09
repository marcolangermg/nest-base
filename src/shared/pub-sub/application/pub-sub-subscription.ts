import { config } from "@app/settings/application-config";
import { HttpRoutes } from "@app/shared/http/http-routes";
import { QueueTopics } from "@app/shared/queue/domain/queue-topics";

interface RetryPolicy {
  minimumBackoff: {
    seconds?: number | Long | string | null;
    nanos?: number | null;
  };
  maximumBackoff: {
    seconds?: number | Long | string | null;
    nanos?: number | null;
  };
}

interface DeadLetterPolicy {
  deadLetterTopic: string;
  maxDeliveryAttempts: number;
}

export interface PubSubSubscriptionInterface {
  topic: QueueTopics;
  subscriptionName: string;
  pushConfig?: {
    pushEndpoint: HttpRoutes;
  };
  ackDeadlineSeconds?: number;
  retainAckedMessages?: boolean;
  retryPolicy?: RetryPolicy;
  deadLetterPolicy?: DeadLetterPolicy;
}

export class PubSubSubscription {
  public readonly topic!: string;
  public readonly subscriptionName!: string;
  public readonly pushConfig?: {
    pushEndpoint: string;
  };
  public readonly ackDeadlineSeconds: number = 300;
  public readonly retainAckedMessages: boolean = false;
  public readonly retryPolicy: RetryPolicy = {
    minimumBackoff: { seconds: 0 },
    maximumBackoff: { seconds: 10 },
  };
  public readonly deadLetterPolicy?: DeadLetterPolicy;
  public readonly httpRoute?: HttpRoutes;

  constructor(props: PubSubSubscriptionInterface) {
    Object.assign(this, props);

    if (props.pushConfig !== undefined) {
      this.httpRoute = props.pushConfig.pushEndpoint;
      this.pushConfig = {
        pushEndpoint: `${config.app.baseUrl}:${config.app.appListenPort}${props.pushConfig.pushEndpoint}`,
      };
    }
  }
}
