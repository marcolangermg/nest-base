import { config } from "@app/settings/application-config";
import { HttpRoutes } from "@app/shared/http/http-routes";
import { QueueTopics } from "@app/shared/queue/domain/queue-topics";
import { ExtendableLogger } from "@app/shared/logger/extendable-logger";

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

export class PubSubSubscription extends ExtendableLogger {
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
    super(PubSubSubscription.name);
    Object.assign(this, props);

    if (props.pushConfig !== undefined) {
      this.httpRoute = props.pushConfig.pushEndpoint;
      
      const baseUrl = config.app.baseUrl || '';
      const endpoint = props.pushConfig.pushEndpoint;
      
      const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
      
      const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      
      const url = `${cleanBaseUrl}${cleanEndpoint}`;
      
      this.pushConfig = {
        pushEndpoint: url,
      };
      this.log(`Configured push endpoint: ${url}`)
    }
  }
}
