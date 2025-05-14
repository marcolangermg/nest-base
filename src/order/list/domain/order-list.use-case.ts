import { OrderListFilter } from "@app/order/shared/entity/order-list-filter";
import { Order } from "@app/order/shared/entity/order.entity";
import { OrderRepository } from "@app/order/shared/repository/domain/order.repository";
import { BaseUseCase } from "@app/shared/base-classes/base-use-case";
import { REQUEST_SCOPED } from "@app/shared/container/request-scoped";
import { Injectable } from "@nestjs/common";

@Injectable(REQUEST_SCOPED)
export class OrderListUseCase extends BaseUseCase {
  constructor(private readonly orderRepository: OrderRepository) {
    super(OrderListUseCase.name);
  }

  public async execute(input: OrderListFilter): Promise<Order[]> {
    return await this.orderRepository.getByOrderListFilter(input);
  }
}
