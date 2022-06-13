import { AccountListFilter } from "@app/example/account/shared/entity/account-list-filter";
import { Account } from "@app/example/account/shared/entity/account.entity";
import {
  FirestoreAccountMapperType,
  fromDatabase,
  toDatabase,
} from "@app/example/account/shared/repository/application/mapper/firestore-account.mapper";
import { AccountRepository } from "@app/example/account/shared/repository/domain/account.repository";
import { ApplicationSettings } from "@app/settings/application-settings";
import { REQUEST_SCOPED } from "@app/shared/container/request-scoped";
import { DataBaseCollections } from "@app/shared/firestore/data-base-collections";
import {
  FirestoreClient,
  FirestoreQueryInterface,
} from "@app/shared/firestore/firestore-client";
import { Injectable } from "@nestjs/common";
import { omit } from "lodash";

@Injectable(REQUEST_SCOPED)
export class FirestoreAccountRepository
  extends FirestoreClient<Account>
  implements AccountRepository
{
  private readonly collectionName = DataBaseCollections.ACCOUNT;

  constructor(protected readonly settings: ApplicationSettings) {
    super(settings);
  }

  public async getByAccountListFilter(
    filter: AccountListFilter,
  ): Promise<Account[]> {
    const query: FirestoreQueryInterface[] = [];

    const filterWithoutLimit = omit(filter, "limit");

    Object.entries(filterWithoutLimit).forEach(([key, value]) => {
      if (value !== undefined) {
        query.push({
          fieldPath: key,
          operator: "==",
          value: value,
        });
      }
    });

    return await this.getDocumentsByQuery({
      collection: this.collectionName,
      queryList: query,
      limit: filter.limit,
    });
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
      queryList: [
        {
          fieldPath: "email",
          operator: "==",
          value: email,
        },
      ],
    });

    return accounts[0];
  }

  protected fromDatabase(data: FirestoreAccountMapperType): Account {
    return fromDatabase(data);
  }
  protected toDatabase(data: Account): Record<string, unknown> {
    return toDatabase(data);
  }
}
