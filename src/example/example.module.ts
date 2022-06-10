import { AccountModule } from "@app/example/account/account.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [AccountModule],
})
export class ExampleModule {}
