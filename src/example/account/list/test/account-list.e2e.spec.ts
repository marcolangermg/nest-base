import { ResponseAccountListDto } from "@app/example/account/list/application/dto/response-account-list.dto";
import { Account } from "@app/example/account/shared/entity/account.entity";
import { AccountRepository } from "@app/example/account/shared/repository/domain/account.repository";
import { AccountFakerBuilder } from "@app/example/account/shared/test/account-faker-builder";
import { HttpRoutes } from "@app/shared/http/http-routes";
import { TestApplication } from "@app/shared/test/test-application";
import { INestApplication } from "@nestjs/common";
import request from "supertest";

const createAccounts = async (app: INestApplication): Promise<Account[]> => {
  const accountList = AccountFakerBuilder.buildMany(10);
  const repository = await app.resolve(AccountRepository);
  for (const account of accountList) {
    await repository.store(account);
  }

  return accountList;
};

describe("Account list (e2e)", () => {
  describe(`(GET) ${HttpRoutes.ACCOUNT_LIST}`, () => {
    it("returns a list of accounts", async () => {
      return new TestApplication({
        buildPubSubQueue: true,
        buildFirestoreDatabase: true,
      }).run(async ({ app }): Promise<void> => {
        const accountList = await createAccounts(app);

        const testAccount = accountList[0]!;
        const query = {
          email: testAccount.email,
          status: testAccount.status,
          name: testAccount.name,
          limit: 10,
        };

        await request(app.getHttpServer())
          .get(HttpRoutes.ACCOUNT_LIST)
          .query(query)
          .expect(200)
          .expect((response) => {
            const body: ResponseAccountListDto = response.body;
            expect(body.accounts.length).toEqual(1);
            expect(body.accounts[0]?.email).toEqual(testAccount.email);
          });
      });
    });
  });
});
