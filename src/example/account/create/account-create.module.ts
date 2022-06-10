import { AsyncAccountCreateController } from "@app/example/account/create/application/async-account-create.controller";
import { AccountCreateController } from "@app/example/account/create/application/account-create.controller";
import { ProcessAccountCreateController } from "@app/example/account/create/application/process-account-create.controller";
import { VendorAccountCreateService } from "@app/example/account/create/application/service/vendor-account-create.service";
import { AccountCreateUseCase } from "@app/example/account/create/domain/account-create.use-case";
import { AccountCreateService } from "@app/example/account/create/domain/service/account-create.service";
import { AccountRepositoryModule } from "@app/example/account/shared/repository/repository.module";
import { provideClass } from "@app/shared/container/provide-class";
import { QueueModule } from "@app/shared/queue/queue.module";
import { Module } from "@nestjs/common";

@Module({
  controllers: [
    AccountCreateController,
    ProcessAccountCreateController,
    AsyncAccountCreateController,
  ],
  providers: [
    provideClass(AccountCreateService, VendorAccountCreateService),
    AccountCreateUseCase,
  ],
  imports: [QueueModule, AccountRepositoryModule],
})
export class AccountCreateModule {}
