import { AccountListFilter } from "@app/example/account/shared/entity/account-list-filter";
import { Account } from "@app/example/account/shared/entity/account.entity";

export abstract class AccountRepository {
  public abstract store(account: Account): Promise<void>;
  public abstract getAccountById(
    accountId: string,
  ): Promise<Account | undefined>;
  public abstract getByEmail(email: string): Promise<Account | undefined>;
  public abstract getByAccountListFilter(
    filter: AccountListFilter,
  ): Promise<Account[]>;
}
