import { EnqueueEvent } from "@app/shared/queue/domain/enqueue-event";

export interface AccountInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Account implements AccountInterface, EnqueueEvent {
  public readonly id!: string;
  public readonly name!: string;
  public readonly email!: string;
  public readonly password!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  constructor(props: AccountInterface) {
    Object.assign(this, props);
  }
  public toEvent(): { [k: string]: string } {
    return {
      type: "account",
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
    };
  }
}
