import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
import path from "path";

config({ path: path.join(__dirname, "../../apps/api/.env") });

export default defineConfig({
  verbose: true,
  schemaFilter: ["public"],
  schema: "./src/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
