import { OrderListFilter } from "@app/example/order/shared/entity/order-list-filter";
import { Order } from "@app/example/order/shared/entity/order.entity";

export abstract class OrderRepository {
  public abstract store(order: Order): Promise<void>;
  public abstract getOrderById(
    orderId: string,
  ): Promise<Order | undefined>;
  public abstract getByOrderListFilter(
    filter: OrderListFilter,
  ): Promise<Order[]>;
}
