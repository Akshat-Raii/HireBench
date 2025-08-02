import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";
config({ path: ".env.local" });

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.ts",
  // out: "./drizzle", // Optional output directory for generated SQL files
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DRIZZLE_DB_URL,
  }
});
