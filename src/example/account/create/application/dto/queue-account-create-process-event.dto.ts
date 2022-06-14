import { AccountCreateProcessEvent } from "@app/example/account/create/domain/entity/account-create-process.event";
import { Account } from "@app/example/account/shared/entity/account.entity";
import { queueBaseEventDto } from "@app/shared/queue/application/dto/queue-base-event.dto";
import { z } from "zod";

export const queueAccountCreateProcessEventDto = queueBaseEventDto.extend({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  status: z.string(),
  password: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type QueueAccountCreateProcessEventDtoType = z.infer<
  typeof queueAccountCreateProcessEventDto
>;

export const accountToCreateAccountProcessEvent = (
  account: Account,
): AccountCreateProcessEvent => {
  return new AccountCreateProcessEvent({
    id: account.id,
    name: account.name,
    email: account.email,
    status: account.status,
    password: account.password,
    createdAt: account.createdAt.toISOString(),
    updatedAt: account.updatedAt.toISOString(),
  });
};
