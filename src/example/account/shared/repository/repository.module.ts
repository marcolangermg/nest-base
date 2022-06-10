import { FirestoreAccountRepository } from "@app/example/account/shared/repository/application/firestore-account.repository";
import { AccountRepository } from "@app/example/account/shared/repository/domain/account.repository";
import { provideClass } from "@app/shared/container/provide-class";
import { Module } from "@nestjs/common";

@Module({
  providers: [provideClass(AccountRepository, FirestoreAccountRepository)],
  exports: [AccountRepository],
})
export class AccountRepositoryModule {}
