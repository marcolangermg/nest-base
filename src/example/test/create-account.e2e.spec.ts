import { CreateAccountService } from "@app/example/domain/service/create-account.service";
import { ErrorCodeList } from "@app/shared/error-code";
import { HttpRoutes } from "@app/shared/http/http-routes";
import { TestApplication } from "@app/shared/test/test-application";
import { faker } from "@faker-js/faker";
import request from "supertest";

describe("Create Account (e2e)", () => {
  describe(`(POST) ${HttpRoutes.ACCOUNT_CREATE}`, () => {
    it("creates an user", async () => {
      const requestData = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.name.firstName(),
      };

      return new TestApplication({}).run(async ({ app }): Promise<void> => {
        await request(app.getHttpServer())
          .post(HttpRoutes.ACCOUNT_CREATE)
          .send(requestData)
          .expect(201)
          .expect((response) => {
            expect(response.body).toEqual(
              expect.objectContaining({ name: requestData.name }),
            );
          });

        const createAccountService = await app.resolve(CreateAccountService);

        const account = await createAccountService.findByEmail(
          requestData.email,
        );

        expect(account).toBeDefined();
        expect(account?.email).toEqual(requestData.email);
        expect(account?.name).toEqual(requestData.name);
      });
    });

    it("returns error email already exists", async () => {
      const requestData = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: faker.name.firstName(),
      };

      return new TestApplication({}).run(async ({ app }): Promise<void> => {
        await request(app.getHttpServer())
          .post(HttpRoutes.ACCOUNT_CREATE)
          .send(requestData)
          .expect(201);

        await request(app.getHttpServer())
          .post(HttpRoutes.ACCOUNT_CREATE)
          .send(requestData)
          .expect(422)
          .expect((response) => {
            expect(response.body).toEqual(
              expect.objectContaining({
                error: ErrorCodeList.CREATE_ACCOUNT_EMAIL_EXISTS,
              }),
            );
          });
      });
    });

    it("returns error when account name is too short", async () => {
      const requestData = {
        email: faker.internet.email(),
        password: faker.internet.password(),
        name: "a",
      };

      return new TestApplication({}).run(async ({ app }): Promise<void> => {
        await request(app.getHttpServer())
          .post(HttpRoutes.ACCOUNT_CREATE)
          .send(requestData)
          .expect(422)
          .expect((response) => {
            expect(response.body).toEqual(
              expect.objectContaining({
                error: ErrorCodeList.CREATE_ACCOUNT_NAME_TOO_SHORT,
              }),
            );
          });
      });
    });

    it("throws error when request dto is missing properties", async () => {
      const requestData = {
        password: faker.internet.password(),
        name: faker.name.firstName(),
      };

      return new TestApplication({}).run(async ({ app }): Promise<void> => {
        await request(app.getHttpServer())
          .post(HttpRoutes.ACCOUNT_CREATE)
          .send(requestData)
          .expect(400)
          .expect((response) => {
            expect(response.body).toEqual(
              expect.objectContaining({
                statusCode: 400,
                message: ["email must be an email"],
                error: "Bad Request",
              }),
            );
          });
      });
    });
  });
});
