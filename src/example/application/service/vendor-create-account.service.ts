import { Account } from "@app/example/domain/entity/account.entity";
import { CreateAccountService } from "@app/example/domain/service/create-account.service";
import { REQUEST_SCOPED } from "@app/shared/container/request-scoped";
import { ErrorCode } from "@app/shared/http/error-code";
import { LogLevel } from "@app/shared/logger/logger";
import { Injectable } from "@nestjs/common";

@Injectable(REQUEST_SCOPED)
export class VendorCreateAccountService extends CreateAccountService {
  constructor() {
    super(VendorCreateAccountService.name);
  }

  public async create(account: Account): Promise<Account | ErrorCode> {
    this.log("Starting", account, LogLevel.DEBUG);

    return Promise.resolve(account);
  }
}
