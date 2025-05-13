import { Order } from "@app/example/order/shared/entity/order.entity";
import { z } from "zod";

export const firestoreOrderMapper = z.object({
  id: z.string(),
  amount: z.number(),
  receivedAt: z.string(),
});

export type FirestoreOrderMapperType = z.infer<typeof firestoreOrderMapper>;

export const fromDatabase = (order: unknown): Order => {
  const orderData = order as Record<string, unknown>;

  if (typeof orderData.receivedAt !== 'string') {
    orderData.receivedAt = new Date().toISOString();
  }

  const parsedOrder = firestoreOrderMapper.parse(orderData);

  return new Order({
    id: parsedOrder.id,
    amount: parsedOrder.amount,
    receivedAt: new Date(parsedOrder.receivedAt),
  });
};

export const toDatabase = (order: Order): FirestoreOrderMapperType => {
  const receivedAt = order.receivedAt instanceof Date ? 
    order.receivedAt.toISOString() : 
    new Date().toISOString();
    
  return firestoreOrderMapper.parse({
    id: order.id,
    amount: order.amount,
    receivedAt: receivedAt,
  });
};
