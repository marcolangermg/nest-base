import { ApplicationSettings } from "@app/settings/application-settings";
import { DataBaseCollections } from "@app/shared/firestore/data-base-collections";
import { Firestore, WhereFilterOp } from "@google-cloud/firestore";
import { v4 } from "uuid";

export interface FirestoreClientStoreInterface {
  collection: DataBaseCollections;
  id?: string;
  document: unknown;
}

export interface FirestoreQueryInterface {
  collection: DataBaseCollections;
  fieldPath: string;
  operator: WhereFilterOp;
  value: unknown;
}

export abstract class FirestoreClient<T> {
  protected readonly firestore: Firestore;

  constructor(protected readonly settings: ApplicationSettings) {
    this.firestore = new Firestore({
      projectId: this.settings.firestore.projectId,
    });
  }

  protected async getDocumentById(
    collection: DataBaseCollections,
    id: string,
  ): Promise<T | undefined> {
    const snapShot = await this.firestore.collection(collection).doc(id).get();

    return this.fromDatabase(snapShot.data()) as T;
  }

  protected async getDocumentsByQuery(
    query: FirestoreQueryInterface,
  ): Promise<T[]> {
    const snapShot = await this.firestore
      .collection(query.collection)
      .where(query.fieldPath, query.operator, query.value)
      .get();

    if (snapShot.empty) {
      return [];
    }

    return snapShot.docs.map((doc) => this.fromDatabase(doc.data()) as T);
  }

  protected async storeDocument(
    data: FirestoreClientStoreInterface,
  ): Promise<void> {
    /* istanbul ignore next */
    const id = data.id ?? v4();

    await this.firestore
      .collection(data.collection)
      .doc(id)
      .set(this.toDatabase(data.document as T), { merge: true });
  }

  protected abstract fromDatabase(data: unknown): T;
  protected abstract toDatabase(data: T): Record<string, unknown>;
}
