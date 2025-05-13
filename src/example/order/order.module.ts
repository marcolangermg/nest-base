import { OrderCreateModule } from "@app/example/order/create/order-create.module";
import { OrderListModule } from "@app/example/order/list/order-list.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [OrderCreateModule, OrderListModule],
})
export class OrderModule {}
