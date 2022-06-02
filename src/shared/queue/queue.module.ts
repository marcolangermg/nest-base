import { provideClass } from "@app/shared/container/provide-class";
import { PubSubModule } from "@app/shared/pub-sub/pub-sub.module";
import { PubSubEnqueuer } from "@app/shared/queue/application/pub-sub-enqueuer";
import { Enqueuer } from "@app/shared/queue/domain/enqueuer";
import { Module } from "@nestjs/common";

@Module({
  providers: [provideClass(Enqueuer, PubSubEnqueuer)],
  imports: [PubSubModule],
  exports: [Enqueuer],
})
export class QueueModule {}
