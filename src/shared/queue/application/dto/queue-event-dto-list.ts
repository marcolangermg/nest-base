import { queueAccountCreateEventDto } from "@app/example/account/create/application/dto/queue-account-create-event.dto";
import { QueueTopics } from "@app/shared/queue/domain/queue-topics";
import { z } from "zod";

export const queueEventDtoList: Record<QueueTopics, z.ZodType> = {
  [QueueTopics.CREATE_ACCOUNT_PROCESS]: queueAccountCreateEventDto,
};
