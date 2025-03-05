import { Hono } from "hono";
import { zValidator } from "@/pkg/util/validator-wrapper";
import { diaperProductInsertSchema } from "@repo/db";
import { diaperProductsService } from "./diaper-products.service";
import { auth, requireAuth } from "@/pkg/middleware/clerk-auth";

export const diaperProductsRoutes = new Hono()
  .use(auth(), requireAuth)
  .get("/", async (c) => {
    const products = await diaperProductsService.getAll();
    return c.json(products);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const products = await diaperProductsService.getById(id);
    if (!products.length) {
      return c.json({ error: "Product not found" }, 404);
    }
    return c.json(products[0]);
  })
  .post("/", zValidator("json", diaperProductInsertSchema), async (c) => {
    const data = c.req.valid("json");
    const product = await diaperProductsService.create(data);
    return c.json(product[0], 201);
  })
  .put("/:id", zValidator("json", diaperProductInsertSchema), async (c) => {
    const id = c.req.param("id");
    const data = c.req.valid("json");
    const products = await diaperProductsService.update(id, data);
    if (!products.length) {
      return c.json({ error: "Product not found" }, 404);
    }
    return c.json(products[0]);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    const products = await diaperProductsService.delete(id);
    if (!products.length) {
      return c.json({ error: "Product not found" }, 404);
    }
    return c.json({ success: true });
  }); 