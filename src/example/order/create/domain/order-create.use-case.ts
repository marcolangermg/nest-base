import { OrderCreateService } from "@app/example/order/create/domain/service/order-create.service";
import { Order } from "@app/example/order/shared/entity/order.entity";
import { BaseUseCase } from "@app/shared/base-classes/base-use-case";
import { REQUEST_SCOPED } from "@app/shared/container/request-scoped";
import { ErrorCode } from "@app/shared/error-code";
import { Injectable } from "@nestjs/common";

@Injectable(REQUEST_SCOPED)
export class OrderCreateUseCase extends BaseUseCase {
  constructor(private readonly orderCreateService: OrderCreateService) {
    super(OrderCreateUseCase.name);
  }

  async execute(order: Order): Promise<Order | ErrorCode> {
    return this.orderCreateService.create(order);
  }
}
