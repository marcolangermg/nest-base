import { AsyncCreateAccountController } from "@app/example/application/async-create-account.controller";
import { CreateAccountController } from "@app/example/application/create-account.controller";
import { ProcessCreateAccountController } from "@app/example/application/process-create-account.controller";
import { FirestoreAccountRepository } from "@app/example/application/repository/firestore-account.repository";
import { VendorCreateAccountService } from "@app/example/application/service/vendor-create-account.service";
import { CreateAccountUseCase } from "@app/example/domain/create-account.use-case";
import { AccountRepository } from "@app/example/domain/repository/account.repository";
import { CreateAccountService } from "@app/example/domain/service/create-account.service";
import { provideClass } from "@app/shared/container/provide-class";
import { QueueModule } from "@app/shared/queue/queue.module";
import { Module } from "@nestjs/common";

@Module({
  controllers: [
    CreateAccountController,
    ProcessCreateAccountController,
    AsyncCreateAccountController,
  ],
  providers: [
    provideClass(CreateAccountService, VendorCreateAccountService),
    provideClass(AccountRepository, FirestoreAccountRepository),
    CreateAccountUseCase,
  ],
  imports: [QueueModule],
})
export class ExampleModule {}
