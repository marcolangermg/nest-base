import { ResponseOrderListDto } from "@app/example/order/list/application/dto/response-order-list.dto";
import { Order } from "@app/example/order/shared/entity/order.entity";
import { OrderRepository } from "@app/example/order/shared/repository/domain/order.repository";
import { OrderFakerBuilder } from "@app/example/order/shared/test/order-faker-builder";
import { HttpRoutes } from "@app/shared/http/http-routes";
import { TestApplication } from "@app/shared/test/test-application";
import { INestApplication } from "@nestjs/common";
import request from "supertest";

const createOrders = async (app: INestApplication): Promise<Order[]> => {
  const orderList = OrderFakerBuilder.buildMany(10);
  const repository = await app.resolve(OrderRepository);
  for (const order of orderList) {
    await repository.store(order);
  }

  return orderList;
};

describe("Order list (e2e)", () => {
  describe(`(GET) ${HttpRoutes.ORDER_LIST}`, () => {
    it("returns a list of orders", async () => {
      return new TestApplication({
        buildPubSubQueue: true,
        buildFirestoreDatabase: true,
      }).run(async ({ app }): Promise<void> => {
        const orderList = await createOrders(app);

        const testOrder = orderList[0]!;
        // Make sure amount is a number, not a string
        const query = {
          amount: Number(testOrder.amount),
          limit: 10,
        };

        await request(app.getHttpServer())
          .get(HttpRoutes.ORDER_LIST)
          .query(query)
          .expect(200)
          .expect((response) => {
            const body: ResponseOrderListDto = response.body;
            expect(body.orders.length).toEqual(1);
            expect(body.orders[0]?.id).toEqual(testOrder.id);
            expect(body.orders[0]?.amount).toEqual(testOrder.amount);
            expect(body.orders[0]?.receivedAt).toEqual(testOrder.receivedAt.toISOString());
          });
      });
    });
  });
});
