import { OrderListFilter } from "@app/order/shared/entity/order-list-filter";
import { Order } from "@app/order/shared/entity/order.entity";
import {
  FirestoreOrderMapperType,
  fromDatabase,
  toDatabase,
} from "@app/order/shared/repository/application/mapper/firestore-order.mapper";
import { OrderRepository } from "@app/order/shared/repository/domain/order.repository";
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
export class FirestoreOrderRepository
  extends FirestoreClient<Order>
  implements OrderRepository
{
  private readonly collectionName = DataBaseCollections.ORDER;

  constructor(protected readonly settings: ApplicationSettings) {
    super(settings);
  }

  public async getByOrderListFilter(
    filter: OrderListFilter,
  ): Promise<Order[]> {
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

  public async store(order: Order): Promise<void> {
    await this.storeDocument({
      collection: this.collectionName,
      document: order,
      id: order.id,
    });
  }

  public async getOrderById(orderId: string): Promise<Order | undefined> {
    return await this.getDocumentById(this.collectionName, orderId);
  }

  protected fromDatabase(data: FirestoreOrderMapperType): Order {
    return fromDatabase(data);
  }
  protected toDatabase(data: Order): Record<string, unknown> {
    return toDatabase(data);
  }
}
