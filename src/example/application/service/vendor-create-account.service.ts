import { Account } from "@app/example/domain/entity/account.entity";
import { CreateAccountService } from "@app/example/domain/service/create-account.service";
import { REQUEST_SCOPED } from "@app/shared/container/request-scoped";
import { ErrorCode, ErrorCodeList } from "@app/shared/error-code";
import { LogLevel } from "@app/shared/logger/logger";
import { Injectable } from "@nestjs/common";

const accountList: Account[] = []; // TODO: replace with database
@Injectable(REQUEST_SCOPED)
export class VendorCreateAccountService extends CreateAccountService {
  constructor() {
    super(VendorCreateAccountService.name);
  }

  public async create(account: Account): Promise<Account | ErrorCode> {
    this.log("Starting", account, LogLevel.DEBUG);

    if (account.name.length < 2) {
      return ErrorCodeList.CREATE_ACCOUNT_NAME_TOO_SHORT;
    }

    const existingAccount = await this.findByEmail(account.email);
    if (existingAccount !== undefined) {
      return ErrorCodeList.CREATE_ACCOUNT_EMAIL_EXISTS;
    }

    accountList.push(account);

    return Promise.resolve(account);
  }

  public async findByEmail(email: string): Promise<Account | undefined> {
    return Promise.resolve(
      accountList.find((account) => account.email === email),
    );
  }
}
