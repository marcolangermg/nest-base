import { HttpRoutes } from "@app/shared/http/http-routes";
import { TestApplication } from "@app/shared/test/test-application";
import request from "supertest";

describe("StatusController (e2e)", () => {
  describe("(GET) /status", () => {
    it("returns healthy status", async () => {
      return new TestApplication({}).run(async ({ app }): Promise<void> => {
        await request(app.getHttpServer())
          .get(HttpRoutes.STATUS)
          .expect(200)
          .expect({ status: true });
      });
    });
  });
});
