import { OrderRepository } from "@app/example/order/shared/repository/domain/order.repository";
import { ErrorCodeList } from "@app/shared/error-code";
import { HttpRoutes } from "@app/shared/http/http-routes";
import { TestApplication } from "@app/shared/test/test-application";
import { faker } from "@faker-js/faker";
import request from "supertest";

describe("Create Order (e2e)", () => {
  describe(`(POST) ${HttpRoutes.ORDER_CREATE}`, () => {
    it("creates an user", async () => {
      const requestData = {
        amount: faker.number.int({ min: 1, max: 100 }),
      };

      let id: string;

      return new TestApplication({ buildFirestoreDatabase: true }).run(
        async ({ app }): Promise<void> => {
          await request(app.getHttpServer())
            .post(HttpRoutes.ORDER_CREATE)
            .send(requestData)
            .expect(201)
            .expect((response) => {
              id = response.body.id;
              expect(response.body).toEqual(
                expect.objectContaining({ amount: requestData.amount }),
              );
            });

          const orderRepository = await app.resolve(OrderRepository);

          const order = await orderRepository.getOrderById(id);

          expect(order).toBeDefined();
          expect(order?.id).toEqual(id);
          expect(order?.amount).toEqual(requestData.amount);
        },
      );
    });

    it("throws error when request dto is missing properties", async () => {
      const requestData = {};

      return new TestApplication({ buildFirestoreDatabase: true }).run(
        async ({ app }): Promise<void> => {
          await request(app.getHttpServer())
            .post(HttpRoutes.ORDER_CREATE)
            .send(requestData)
            .expect(400)
            .expect((response) => {
              expect(response.body).toEqual(
                expect.objectContaining({
                  statusCode: 400,
                  error: "Bad Request",
                }),
              );
              expect(response.body.message).toEqual(
                expect.arrayContaining([
                  expect.stringContaining("amount")
                ])
              );
            });
        },
      );
    });
  });
});
