import { AppModule } from "@app/app.module";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";

const buildApp = async function () {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleFixture.createNestApplication();
  await app.init();

  return app;
};

describe("StatusController (e2e)", () => {
  describe("(GET) /status", () => {
    it("returns healthy status", async () => {
      const app = await buildApp();

      return request(app.getHttpServer()).get(`/status`).expect(200).expect({
        status: true,
      });
    });
  });
});
