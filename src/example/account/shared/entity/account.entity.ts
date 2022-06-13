import { AccountStatus } from "@app/example/account/shared/entity/account-status.entity";

export interface AccountInterface {
  id: string;
  name: string;
  email: string;
  status?: AccountStatus;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Account implements AccountInterface {
  public readonly id!: string;
  public readonly name!: string;
  public readonly email!: string;
  public readonly status: AccountStatus = AccountStatus.ACTIVE;
  public readonly password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  constructor(props: AccountInterface) {
    Object.assign(this, props);
  }
}
