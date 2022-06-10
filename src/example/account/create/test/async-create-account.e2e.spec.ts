import { AccountCreateService } from "@app/example/account/create/domain/service/account-create.service";
import { HttpRoutes } from "@app/shared/http/http-routes";
import { QueueTopics } from "@app/shared/queue/domain/queue-topics";
import { TestApplication } from "@app/shared/test/test-application";
import { faker } from "@faker-js/faker";
import request from "supertest";

describe("Async Create account", () => {
  describe(`(POST) ${HttpRoutes.ACCOUNT_CREATE_ASYNC}`, () => {
    it("creates an account", async () => {
      const requestData = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.name.firstName(),
      };

      return new TestApplication({
        buildPubSubQueue: true,
        buildFirestoreDatabase: true,
      }).run(async ({ app, pubSubQueue }): Promise<void> => {
        await request(app.getHttpServer())
          .post(HttpRoutes.ACCOUNT_CREATE_ASYNC)
          .send(requestData)
          .expect(201)
          .expect((response) => {
            expect(response.body).toEqual(
              expect.objectContaining({ enqueued: true }),
            );
          });

        await pubSubQueue?.executeQueue(
          QueueTopics.CREATE_ACCOUNT_PROCESS,
          app,
        );

        const createAccountService = await app.resolve(AccountCreateService);

        const account = await createAccountService.findByEmail(
          requestData.email,
        );
        expect(account).toBeDefined();
        expect(account?.name).toEqual(requestData.name);
      });
    });
  });
});
