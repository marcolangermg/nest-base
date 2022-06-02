import { provideClass } from "@app/shared/container/provide-class";
import { PubSubHttpClient } from "@app/shared/pub-sub/application/pub-sub-http-client";
import { PubSubHttpService } from "@app/shared/pub-sub/application/pub-sub-http-service";
import { PubSubService } from "@app/shared/pub-sub/domain/pub-sub-service";
import { Module } from "@nestjs/common";

@Module({
  providers: [PubSubHttpClient, provideClass(PubSubService, PubSubHttpService)],
  exports: [PubSubService],
})
export class PubSubModule {}
