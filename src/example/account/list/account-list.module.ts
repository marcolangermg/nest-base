import { CreateAccountController } from "@app/example/account/list/application/account-list.controller";
import { AccountListUseCase } from "@app/example/account/list/domain/account-list.use-case";
import { AccountRepositoryModule } from "@app/example/account/shared/repository/repository.module";
import { Module } from "@nestjs/common";

@Module({
  controllers: [CreateAccountController],
  providers: [AccountListUseCase],
  imports: [AccountRepositoryModule],
})
export class AccountListModule {}
