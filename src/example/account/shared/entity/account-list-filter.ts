import { AccountStatus } from "@app/example/account/shared/entity/account-status.entity";

export interface AccountListFilter {
  readonly name?: string;
  readonly email?: string;
  readonly status?: AccountStatus;
  readonly limit?: number;
}
