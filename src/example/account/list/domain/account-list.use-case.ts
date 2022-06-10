import { AccountListFilter } from "@app/example/account/list/domain/entity/account-list-filter";
import { Account } from "@app/example/account/shared/entity/account.entity";
import { BaseUseCase } from "@app/shared/base-classes/base-use-case";
import { REQUEST_SCOPED } from "@app/shared/container/request-scoped";
import { Injectable } from "@nestjs/common";

@Injectable(REQUEST_SCOPED)
export class AccountListUseCase extends BaseUseCase {
  constructor() {
    super(AccountListUseCase.name);
  }

  public async execute(input: AccountListFilter): Promise<Account[]> {
    return Promise.resolve([]);
  }
}
