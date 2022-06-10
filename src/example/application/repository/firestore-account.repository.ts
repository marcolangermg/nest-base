import {
  FirestoreAccountMapperType,
  fromDatabase,
  toDatabase,
} from "@app/example/application/repository/mapper/firestore-account.mapper";
import { Account } from "@app/example/domain/entity/account.entity";
import { AccountRepository } from "@app/example/domain/repository/account.repository";
import { ApplicationSettings } from "@app/settings/application-settings";
import { REQUEST_SCOPED } from "@app/shared/container/request-scoped";
import { DataBaseCollections } from "@app/shared/firestore/data-base-collections";
import { FirestoreClient } from "@app/shared/firestore/firestore-client";
import { Injectable } from "@nestjs/common";

@Injectable(REQUEST_SCOPED)
export class FirestoreAccountRepository
  extends FirestoreClient<Account>
  implements AccountRepository
{
  private readonly collectionName = DataBaseCollections.ACCOUNT;

  constructor(protected readonly settings: ApplicationSettings) {
    super(settings);
  }

  public async store(account: Account): Promise<void> {
    await this.storeDocument({
      collection: this.collectionName,
      document: account,
      id: account.id,
    });
  }

  public async getAccountById(accountId: string): Promise<Account | undefined> {
    return await this.getDocumentById(this.collectionName, accountId);
  }

  public async getByEmail(email: string): Promise<Account | undefined> {
    const accounts = await this.getDocumentsByQuery({
      collection: this.collectionName,
      fieldPath: "email",
      operator: "==",
      value: email,
    });

    return accounts.length > 0 ? accounts[0] : undefined;
  }

  protected fromDatabase(data: FirestoreAccountMapperType): Account {
    return fromDatabase(data);
  }
  protected toDatabase(data: Account): Record<string, unknown> {
    return toDatabase(data);
  }
}
