import { queueOrderCreateProcessEventDto } from "@app/order/create/application/dto/queue-order-create-process-event.dto";
import { Order } from "@app/order/shared/entity/order.entity";
import { QueueRequestDto } from "@app/shared/queue/application/dto/queue-request.dto";

export class ProcessOrderCreateDto extends QueueRequestDto {
  constructor() {
    super();
  }

  toOrder(): Order {
    const attributes = queueOrderCreateProcessEventDto.parse(
      this.message.attributes,
    );

    return new Order({
      id: attributes.id,
      amount: attributes.amount,
      receivedAt: new Date(attributes.receivedAt),
    });
  }
}
