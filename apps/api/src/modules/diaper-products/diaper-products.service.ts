import { db, diaperProducts, eq } from "@repo/db";
import { nanoid } from "nanoid";
import type { NewDiaperProduct } from "@repo/db";

export const diaperProductsService = {
  async getAll() {
    return db.select().from(diaperProducts);
  },

  async getById(id: string) {
    return db.select().from(diaperProducts).where(eq(diaperProducts.id, id));
  },

  async create(data: Omit<NewDiaperProduct, "id">) {
    return db
      .insert(diaperProducts)
      .values({ ...data, id: nanoid() })
      .returning();
  },

  async update(id: string, data: Partial<NewDiaperProduct>) {
    return db
      .update(diaperProducts)
      .set(data)
      .where(eq(diaperProducts.id, id))
      .returning();
  },

  async delete(id: string) {
    return db
      .delete(diaperProducts)
      .where(eq(diaperProducts.id, id))
      .returning();
  },
}; 