import { AccountCreateService } from "@app/example/account/create/domain/service/account-create.service";
import { Account } from "@app/example/account/shared/entity/account.entity";
import { BaseUseCase } from "@app/shared/base-classes/base-use-case";
import { REQUEST_SCOPED } from "@app/shared/container/request-scoped";
import { ErrorCode } from "@app/shared/error-code";
import { LogLevel } from "@app/shared/logger/logger";
import { Injectable } from "@nestjs/common";

@Injectable(REQUEST_SCOPED)
export class AccountCreateUseCase extends BaseUseCase {
  constructor(private readonly accountCreateService: AccountCreateService) {
    super(AccountCreateUseCase.name);
  }

  async execute(account: Account): Promise<Account | ErrorCode> {
    this.log("Starting", account, LogLevel.DEBUG);

    return this.accountCreateService.create(account);
  }
}
