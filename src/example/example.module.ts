import { CreateAccountController } from "@app/example/application/create-account.controller";
import { CreateAccountUseCase } from "@app/example/domain/create-account.use-case";
import { Module } from "@nestjs/common";

@Module({
  controllers: [CreateAccountController],
  providers: [CreateAccountUseCase],
})
export class ExampleModule {}
