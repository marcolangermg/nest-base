import { provideClass } from "@app/shared/container/provide-class";
import { PubSubEnqueuer } from "@app/shared/queue/application/pub-sub-enqueuer";
import { Enqueuer } from "@app/shared/queue/domain/enqueuer";
import { Module } from "@nestjs/common";
import { PubSubQueueInitializer } from "./application/pub-sub-queue-initializer";

@Module({
  providers: [
    provideClass(Enqueuer, PubSubEnqueuer),
    PubSubQueueInitializer
  ],
  exports: [Enqueuer],
})
export class QueueModule {}
