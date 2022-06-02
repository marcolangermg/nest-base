import { z } from "zod";

export const queueBaseEventDto = z.object({
  type: z.string(),
});

export type queueBaseEventDtoType = z.infer<typeof queueBaseEventDto>;
