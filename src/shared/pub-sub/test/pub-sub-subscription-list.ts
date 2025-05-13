import { HttpRoutes } from "@app/shared/http/http-routes";
import { PubSubSubscription } from "@app/shared/pub-sub/application/pub-sub-subscription";
import { QueueTopics } from "@app/shared/queue/domain/queue-topics";

export const pubSubSubscriptionList: PubSubSubscription[] = [
  new PubSubSubscription({
    topic: QueueTopics.CREATE_ORDER_PROCESS,
    subscriptionName: "create-order-process",
    pushConfig: {
      pushEndpoint: HttpRoutes.ORDER_CREATE_PROCESS,
    },
  }),
];
