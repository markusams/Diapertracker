import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import * as schema from "./schema";

export type Post = InferSelectModel<typeof schema.posts>;
export type NewPost = InferInsertModel<typeof schema.posts>;

export const postInsertSchema = createInsertSchema(schema.posts).omit({ userId: true });
export const postSelectSchema = createSelectSchema(schema.posts);

export type DiaperProduct = InferSelectModel<typeof schema.diaperProducts>;
export type NewDiaperProduct = InferInsertModel<typeof schema.diaperProducts>;

export const diaperProductInsertSchema = createInsertSchema(schema.diaperProducts);
export const diaperProductSelectSchema = createSelectSchema(schema.diaperProducts);

export type DiaperPurchase = InferSelectModel<typeof schema.diaperPurchases>;
export type NewDiaperPurchase = InferInsertModel<typeof schema.diaperPurchases>;

export const diaperPurchaseInsertSchema = createInsertSchema(schema.diaperPurchases);
export const diaperPurchaseSelectSchema = createSelectSchema(schema.diaperPurchases);
