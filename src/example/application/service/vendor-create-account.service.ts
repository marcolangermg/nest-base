import { Account } from "@app/example/domain/entity/account.entity";
import { AccountRepository } from "@app/example/domain/repository/account.repository";
import { CreateAccountService } from "@app/example/domain/service/create-account.service";
import { REQUEST_SCOPED } from "@app/shared/container/request-scoped";
import { ErrorCode, ErrorCodeList } from "@app/shared/error-code";
import { Injectable } from "@nestjs/common";

@Injectable(REQUEST_SCOPED)
export class VendorCreateAccountService extends CreateAccountService {
  constructor(private readonly accountRepository: AccountRepository) {
    super(VendorCreateAccountService.name);
  }

  public async create(account: Account): Promise<Account | ErrorCode> {
    if (account.name.length < 2) {
      return ErrorCodeList.CREATE_ACCOUNT_NAME_TOO_SHORT;
    }

    const existingAccount = await this.findByEmail(account.email);
    if (existingAccount !== undefined) {
      return ErrorCodeList.CREATE_ACCOUNT_EMAIL_EXISTS;
    }

    await this.accountRepository.store(account);

    return account;
  }

  public async findByEmail(email: string): Promise<Account | undefined> {
    return await this.accountRepository.getByEmail(email);
  }
}
