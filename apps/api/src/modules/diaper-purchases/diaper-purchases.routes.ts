import { Hono } from "hono";
import { zValidator } from "@/pkg/util/validator-wrapper";
import { diaperPurchaseInsertSchema } from "@repo/db";
import { diaperPurchasesService } from "./diaper-purchases.service";
import { auth, requireAuth } from "@/pkg/middleware/clerk-auth";

export const diaperPurchasesRoutes = new Hono()
  .use(auth(), requireAuth)
  .get("/", async (c) => {
    const purchases = await diaperPurchasesService.getAll();
    return c.json(purchases);
  })
  .get("/:id", async (c) => {
    const id = c.req.param("id");
    const purchases = await diaperPurchasesService.getById(id);
    if (!purchases.length) {
      return c.json({ error: "Purchase not found" }, 404);
    }
    return c.json(purchases[0]);
  })
  .post("/", zValidator("json", diaperPurchaseInsertSchema), async (c) => {
    const data = c.req.valid("json");
    const purchase = await diaperPurchasesService.create(data);
    return c.json(purchase[0], 201);
  })
  .put("/:id", zValidator("json", diaperPurchaseInsertSchema), async (c) => {
    const id = c.req.param("id");
    const data = c.req.valid("json");
    const purchases = await diaperPurchasesService.update(id, data);
    if (!purchases.length) {
      return c.json({ error: "Purchase not found" }, 404);
    }
    return c.json(purchases[0]);
  })
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    const purchases = await diaperPurchasesService.delete(id);
    if (!purchases.length) {
      return c.json({ error: "Purchase not found" }, 404);
    }
    return c.json({ success: true });
  }); 