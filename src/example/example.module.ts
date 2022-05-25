import { CreateAccountController } from "@app/example/application/create-account.controller";
import { VendorCreateAccountService } from "@app/example/application/service/vendor-create-account.service";
import { CreateAccountUseCase } from "@app/example/domain/create-account.use-case";
import { CreateAccountService } from "@app/example/domain/service/create-account.service";
import { provideClass } from "@app/shared/container/provide-class";
import { Module } from "@nestjs/common";

@Module({
  controllers: [CreateAccountController],
  providers: [
    provideClass(CreateAccountService, VendorCreateAccountService),
    CreateAccountUseCase,
  ],
})
export class ExampleModule {}
