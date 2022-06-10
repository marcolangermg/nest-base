import { AccountStatus } from "@app/example/account/shared/entity/account-status.entity";
import { Account } from "@app/example/account/shared/entity/account.entity";
import { z } from "zod";

export const firestoreAccountMapper = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  status: z.string(),
  password: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type FirestoreAccountMapperType = z.infer<typeof firestoreAccountMapper>;

export const fromDatabase = (account: FirestoreAccountMapperType): Account => {
  return new Account({
    id: account.id,
    name: account.name,
    email: account.email,
    password: account.password,
    status: account.status as AccountStatus,
    createdAt: new Date(account.createdAt),
    updatedAt: new Date(account.updatedAt),
  });
};

export const toDatabase = (account: Account): FirestoreAccountMapperType => {
  return {
    id: account.id,
    name: account.name,
    email: account.email,
    status: account.status,
    password: account.password,
    createdAt: account.createdAt.toISOString(),
    updatedAt: account.updatedAt.toISOString(),
  };
};
