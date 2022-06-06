import { queueBaseEventDto } from "@app/shared/queue/application/dto/queue-base-event.dto";
import { z } from "zod";

export const queueCreateAccountEventDto = queueBaseEventDto.extend({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type queueCreateAccountEventDtoType = z.infer<
  typeof queueCreateAccountEventDto
>;