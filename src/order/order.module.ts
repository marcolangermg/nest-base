import { OrderCreateModule } from "@app/order/create/order-create.module";
import { OrderListModule } from "@app/order/list/order-list.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [OrderCreateModule, OrderListModule],
})
export class OrderModule {}
