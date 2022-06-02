import { queueCreateAccountEventDto } from "@app/example/application/dto/queue-create-account-event.dto";
import { Account } from "@app/example/domain/entity/account.entity";
import { QueueRequestDto } from "@app/shared/queue/application/dto/queue-request.dto";

export class ProcessCreateAccountDto extends QueueRequestDto {
  constructor() {
    super();
  }

  toAccount(): Account {
    const attributes = queueCreateAccountEventDto.parse(
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
