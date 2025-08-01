import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.ts",
  // out: "./drizzle", // Optional output directory for generated SQL files
  dbCredentials: {
    url: 'postgresql://neondb_owner:npg_Tpfcr80OaCAu@ep-cold-tree-a1z2tk0l-pooler.ap-southeast-1.aws.neon.tech/HireBench?sslmode=require&channel_binding=require'
  }
});
