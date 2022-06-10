import { queueAccountCreateEventDto } from "@app/example/account/create/application/dto/queue-account-create-event.dto";
import { Account } from "@app/example/account/shared/entity/account.entity";
import { QueueRequestDto } from "@app/shared/queue/application/dto/queue-request.dto";

export class ProcessAccountCreateDto extends QueueRequestDto {
  constructor() {
    super();
  }

  toAccount(): Account {
    const attributes = queueAccountCreateEventDto.parse(
      this.message.attributes,
    );

    return new Account({
      id: attributes.id,
      name: attributes.name,
      email: attributes.email,
      password: attributes.password,
      createdAt: new Date(attributes.createdAt),
      updatedAt: new Date(attributes.updatedAt),
    });
  }
}
