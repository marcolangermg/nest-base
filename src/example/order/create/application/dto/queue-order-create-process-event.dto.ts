import { OrderCreateProcessEvent } from "@app/example/order/create/domain/entity/order-create-process.event";
import { Order } from "@app/example/order/shared/entity/order.entity";
import { queueBaseEventDto } from "@app/shared/queue/application/dto/queue-base-event.dto";
import { z } from "zod";

export const queueOrderCreateProcessEventDto = queueBaseEventDto.extend({
  id: z.string(),
  amount: z.string().transform((amount) => Number(amount)),
  receivedAt: z.string(),
});

export type QueueOrderCreateProcessEventDtoType = z.infer<
  typeof queueOrderCreateProcessEventDto
>;

export const orderToCreateOrderProcessEvent = (
  order: Order,
): OrderCreateProcessEvent => {
  return new OrderCreateProcessEvent({
    id: order.id,
    amount: order.amount.toString(),
    receivedAt: order.receivedAt.toISOString(),
  });
};
