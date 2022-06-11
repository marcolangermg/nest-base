import { Account } from "@app/example/account/shared/entity/account.entity";
import { faker } from "@faker-js/faker";
import { range } from "lodash";
import { v4 } from "uuid";

export class AccountFakerBuilder {
  public static build(): Account {
    return new Account({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.name.firstName(),
      id: v4(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    });
  }

  public static buildMany(count: number): Account[] {
    const accountList: Account[] = [];

    range(1, count).forEach(() => {
      const account = AccountFakerBuilder.build();
      accountList.push(account);
    });

    return accountList;
  }
}
