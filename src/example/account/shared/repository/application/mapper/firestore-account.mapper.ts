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
  const parsedAccount = firestoreAccountMapper.parse(account);

  return new Account({
    id: parsedAccount.id,
    name: parsedAccount.name,
    email: parsedAccount.email,
    password: parsedAccount.password,
    status: parsedAccount.status as AccountStatus,
    createdAt: new Date(parsedAccount.createdAt),
    updatedAt: new Date(parsedAccount.updatedAt),
  });
};

export const toDatabase = (account: Account): FirestoreAccountMapperType => {
  return firestoreAccountMapper.parse({
    id: account.id,
    name: account.name,
    email: account.email,
    status: account.status,
    password: account.password,
    createdAt: account.createdAt.toISOString(),
    updatedAt: account.updatedAt.toISOString(),
  });
};
