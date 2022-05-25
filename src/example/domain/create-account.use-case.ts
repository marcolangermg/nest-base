import { Account } from "@app/example/domain/entity/account.entity";
import { BaseUseCase } from "@app/shared/base-classes/base-use-case";
import { REQUEST_SCOPED } from "@app/shared/container/request-scoped";
import { ErrorCode } from "@app/shared/http/error-code";
import { LogLevel } from "@app/shared/logger/logger";
import { Injectable } from "@nestjs/common";

@Injectable(REQUEST_SCOPED)
export class CreateAccountUseCase extends BaseUseCase {
  constructor() {
    super(CreateAccountUseCase.name);
  }
  async execute(account: Account): Promise<Account | ErrorCode> {
    this.log("Starting", account, LogLevel.DEBUG);

    return Promise.resolve(account);
  }
}
