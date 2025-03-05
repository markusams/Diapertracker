import { db, diaperPurchases, eq } from "@repo/db";
import { nanoid } from "nanoid";
import type { NewDiaperPurchase } from "@repo/db";

export const diaperPurchasesService = {
  async getAll() {
    return db.select().from(diaperPurchases);
  },

  async getById(id: string) {
    return db.select().from(diaperPurchases).where(eq(diaperPurchases.id, id));
  },

  async create(data: Omit<NewDiaperPurchase, "id">) {
    return db
      .insert(diaperPurchases)
      .values({ ...data, id: nanoid() })
      .returning();
  },

  async update(id: string, data: Partial<NewDiaperPurchase>) {
    return db
      .update(diaperPurchases)
      .set(data)
      .where(eq(diaperPurchases.id, id))
      .returning();
  },

  async delete(id: string) {
    return db
      .delete(diaperPurchases)
      .where(eq(diaperPurchases.id, id))
      .returning();
  },
}; 