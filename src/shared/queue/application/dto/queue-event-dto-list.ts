import { queueOrderCreateProcessEventDto } from "@app/example/order/create/application/dto/queue-order-create-process-event.dto";
import { QueueTopics } from "@app/shared/queue/domain/queue-topics";
import { z } from "zod";

export const queueEventDtoList: Record<QueueTopics, z.ZodType> = {
  [QueueTopics.CREATE_ORDER_PROCESS]: queueOrderCreateProcessEventDto,
};
