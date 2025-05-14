import { OrderCreateService } from "@app/order/create/domain/service/order-create.service";
import { Order } from "@app/order/shared/entity/order.entity";
import { OrderRepository } from "@app/order/shared/repository/domain/order.repository";
import { REQUEST_SCOPED } from "@app/shared/container/request-scoped";
import { ErrorCode } from "@app/shared/error-code";
import { Injectable } from "@nestjs/common";

@Injectable(REQUEST_SCOPED)
export class VendorOrderCreateService extends OrderCreateService {
  constructor(private readonly orderRepository: OrderRepository) {
    super(VendorOrderCreateService.name);
  }

  public async create(order: Order): Promise<Order | ErrorCode> {
    await this.orderRepository.store(order);

    return order;
  }
}
