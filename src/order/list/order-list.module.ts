import { CreateOrderController } from "@app/order/list/application/order-list.controller";
import { OrderListUseCase } from "@app/order/list/domain/order-list.use-case";
import { OrderRepositoryModule } from "@app/order/shared/repository/repository.module";
import { Module } from "@nestjs/common";

@Module({
  controllers: [CreateOrderController],
  providers: [OrderListUseCase],
  imports: [OrderRepositoryModule],
})
export class OrderListModule {}
