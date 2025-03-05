import { pgTable, text, timestamp, varchar, date, decimal } from "drizzle-orm/pg-core";
import { lifecycleDates } from "./util/lifecycle-dates";

export const users = pgTable("users", {
  userId: varchar("user_id", { length: 128 }).primaryKey(),
  // Add more clerk fields you want to sync here
  email: text("email").notNull(),
  ...lifecycleDates,
});

export const posts = pgTable("posts", {
  id: varchar("id", { length: 255 }).primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  userId: varchar("user_id", { length: 128 })
    .notNull()
    .references(() => users.userId),
  ...lifecycleDates,
});

export const diaperProducts = pgTable("diaper_products", {
  id: varchar("id", { length: 255 }).primaryKey(),
  brand: varchar("brand", { length: 255 }).notNull(),
  product: varchar("product", { length: 255 }).notNull(),
  ...lifecycleDates,
});

export const diaperPurchases = pgTable("diaper_purchases", {
  id: varchar("id", { length: 255 }).primaryKey(),
  productId: varchar("product_id", { length: 255 })
    .notNull()
    .references(() => diaperProducts.id),
  purchaseDate: date("purchase_date").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  ...lifecycleDates,
});
