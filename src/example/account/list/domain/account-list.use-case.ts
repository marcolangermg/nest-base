import { AccountListFilter } from "@app/example/account/shared/entity/account-list-filter";
import { Account } from "@app/example/account/shared/entity/account.entity";
import { AccountRepository } from "@app/example/account/shared/repository/domain/account.repository";
import { BaseUseCase } from "@app/shared/base-classes/base-use-case";
import { REQUEST_SCOPED } from "@app/shared/container/request-scoped";
import { Injectable } from "@nestjs/common";

@Injectable(REQUEST_SCOPED)
export class AccountListUseCase extends BaseUseCase {
  constructor(private readonly accountRepository: AccountRepository) {
    super(AccountListUseCase.name);
  }

  public async execute(input: AccountListFilter): Promise<Account[]> {
    return await this.accountRepository.getByAccountListFilter(input);
  }
}
