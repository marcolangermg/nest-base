import { AsyncOrderCreateController } from "@app/order/create/application/async-order-create.controller";
import { OrderCreateController } from "@app/order/create/application/order-create.controller";
import { ProcessOrderCreateController } from "@app/order/create/application/process-order-create.controller";
import { VendorOrderCreateService } from "@app/order/create/application/service/vendor-order-create.service";
import { OrderCreateUseCase } from "@app/order/create/domain/order-create.use-case";
import { OrderCreateService } from "@app/order/create/domain/service/order-create.service";
import { OrderRepositoryModule } from "@app/order/shared/repository/repository.module";
import { provideClass } from "@app/shared/container/provide-class";
import { QueueModule } from "@app/shared/queue/queue.module";
import { Module } from "@nestjs/common";

@Module({
  controllers: [
    OrderCreateController,
    ProcessOrderCreateController,
    AsyncOrderCreateController,
  ],
  providers: [
    provideClass(OrderCreateService, VendorOrderCreateService),
    OrderCreateUseCase,
  ],
  imports: [QueueModule, OrderRepositoryModule],
})
export class OrderCreateModule {}
