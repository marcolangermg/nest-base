import { Account } from "@app/example/account/shared/entity/account.entity";
import { BaseService } from "@app/shared/base-classes/base-service";
import { ErrorCode } from "@app/shared/error-code";

export abstract class AccountCreateService extends BaseService {
  abstract create(account: Account): Promise<Account | ErrorCode>;
  abstract findByEmail(email: string): Promise<Account | undefined>;
}
