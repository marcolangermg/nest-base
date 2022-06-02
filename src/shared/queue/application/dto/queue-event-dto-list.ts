import { queueCreateAccountEventDto } from "@app/example/application/dto/queue-create-account-event.dto";
import { QueueTopics } from "@app/shared/queue/domain/queue-topics";
import { z } from "zod";

export const queueEventDtoList: Record<QueueTopics, z.ZodType> = {
  [QueueTopics.CREATE_ACCOUNT_PROCESS]: queueCreateAccountEventDto,
};
