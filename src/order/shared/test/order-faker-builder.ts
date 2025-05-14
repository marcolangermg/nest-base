import { Order } from "@app/order/shared/entity/order.entity";
import { faker } from "@faker-js/faker";
import { range } from "lodash";
import { v4 } from "uuid";

export class OrderFakerBuilder {
  public static build(): Order {
    return new Order({
      id: v4(),
      amount: faker.  number.int({ min: 1, max: 100 }),
      receivedAt: faker.date.past(),
    });
  }

  public static buildMany(count: number): Order[] {
    const orderList: Order[] = [];

    range(1, count).forEach(() => {
      const order = OrderFakerBuilder.build();
      orderList.push(order);
    });

    return orderList;
  }
}
