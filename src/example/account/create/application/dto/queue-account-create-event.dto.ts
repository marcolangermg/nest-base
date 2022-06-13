import { CreateAccountEvent } from "@app/example/account/create/domain/entity/create-account-process.event";
import { Account } from "@app/example/account/shared/entity/account.entity";
import { queueBaseEventDto } from "@app/shared/queue/application/dto/queue-base-event.dto";
import { z } from "zod";

export const queueAccountCreateEventDto = queueBaseEventDto.extend({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type QueueAccountCreateEventDtoType = z.infer<
  typeof queueAccountCreateEventDto
>;

export const accountToAccountCreateEvent = (
  account: Account,
): CreateAccountEvent => {
  return new CreateAccountEvent({
    type: "account",
    id: account.id,
    name: account.name,
    email: account.email,
    status: account.status,
    password: account.password,
    createdAt: account.createdAt.toISOString(),
    updatedAt: account.updatedAt.toISOString(),
  });
};
