import { provideClass } from "@app/shared/container/provide-class";
import { PubSubEnqueuer } from "@app/shared/queue/application/pub-sub-enqueuer";
import { Enqueuer } from "@app/shared/queue/domain/enqueuer";
import { Module } from "@nestjs/common";

@Module({
  providers: [provideClass(Enqueuer, PubSubEnqueuer)],
  exports: [Enqueuer],
})
export class QueueModule {}
