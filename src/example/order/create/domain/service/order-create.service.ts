import { Order } from "@app/example/order/shared/entity/order.entity";
import { BaseService } from "@app/shared/base-classes/base-service";
import { ErrorCode } from "@app/shared/error-code";

export abstract class OrderCreateService extends BaseService {
  abstract create(order: Order): Promise<Order | ErrorCode>;
}
