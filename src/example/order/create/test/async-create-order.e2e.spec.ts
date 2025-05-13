import { OrderCreateService } from "@app/example/order/create/domain/service/order-create.service";
import { HttpRoutes } from "@app/shared/http/http-routes";
import { QueueTopics } from "@app/shared/queue/domain/queue-topics";
import { TestApplication } from "@app/shared/test/test-application";
import { faker } from "@faker-js/faker";
import request from "supertest";
import { OrderRepository } from "../../shared/repository/domain/order.repository";

describe("Async Create order", () => {
  describe(`(POST) ${HttpRoutes.ORDER_CREATE_ASYNC}`, () => {
    it("creates an order", async () => {
      const requestData = {
        amount: faker.number.int({ min: 1, max: 100 })
      };

      return new TestApplication({
        buildPubSubQueue: true,
        buildFirestoreDatabase: true,
      }).run(async ({ app, pubSubQueue }): Promise<void> => {
        await request(app.getHttpServer())
          .post(HttpRoutes.ORDER_CREATE_ASYNC)
          .send(requestData)
          .expect(201)
          .expect((response) => {
            expect(response.body).toEqual(
              expect.objectContaining({ enqueued: true }),
            );
          });

        await pubSubQueue?.executeQueue(
          QueueTopics.CREATE_ORDER_PROCESS,
          app,
        );

        const orderRepository = await app.resolve(OrderRepository);

        const order = await orderRepository.getByOrderListFilter({
          amount: requestData.amount,
        });
        expect(order).toBeDefined();
        expect(order?.[0]?.amount).toEqual(requestData.amount);
      });
    });
  });
});
