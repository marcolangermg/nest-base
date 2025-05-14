export interface OrderInterface {
  id: string;
  amount: number;
  receivedAt: Date;
}

export class Order implements OrderInterface {
  public readonly id!: string;
  public readonly amount!: number;
  public readonly receivedAt!: Date;

  constructor(props: OrderInterface) {
    Object.assign(this, props);
  }
}
