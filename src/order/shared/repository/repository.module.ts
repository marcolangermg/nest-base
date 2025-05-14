import { FirestoreOrderRepository } from "@app/order/shared/repository/application/firestore-order.repository";
import { OrderRepository } from "@app/order/shared/repository/domain/order.repository";
import { provideClass } from "@app/shared/container/provide-class";
import { Module } from "@nestjs/common";

@Module({
  providers: [provideClass(OrderRepository, FirestoreOrderRepository)],
  exports: [OrderRepository],
})
export class OrderRepositoryModule {}
