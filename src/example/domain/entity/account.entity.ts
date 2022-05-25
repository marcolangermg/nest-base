export interface AccountInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Account implements AccountInterface {
  public readonly id!: string;
  public readonly name!: string;
  public readonly email!: string;
  public readonly password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  constructor(props: AccountInterface) {
    Object.assign(this, props);
  }
}
