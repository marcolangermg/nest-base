import { Account } from "@app/example/domain/entity/account.entity";
import { BaseService } from "@app/shared/base-classes/base-service";
import { ErrorCode } from "@app/shared/http/error-code";

export abstract class CreateAccountService extends BaseService {
  abstract create(account: Account): Promise<Account | ErrorCode>;
}
