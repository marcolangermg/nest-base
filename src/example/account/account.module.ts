import { AccountCreateModule } from "@app/example/account/create/account-create.module";
import { AccountRepositoryModule } from "@app/example/account/shared/repository/repository.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [AccountCreateModule, AccountRepositoryModule],
})
export class AccountModule {}
