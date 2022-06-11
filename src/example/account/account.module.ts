import { AccountCreateModule } from "@app/example/account/create/account-create.module";
import { AccountListModule } from "@app/example/account/list/account-list.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [AccountCreateModule, AccountListModule],
})
export class AccountModule {}
