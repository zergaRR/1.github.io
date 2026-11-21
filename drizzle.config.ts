import "dotenv/config";
import { defineConfig } from "drizzle-kit";

/**
 * URL берётся из DATABASE_URL (.env).
 * Значение по умолчанию совпадает с docker-compose.yml — для локальной разработки.
 */
const url =
  process.env.DATABASE_URL ??
  "postgresql://postgres:postgres@127.0.0.1:5432/app_db";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: { url },
});
