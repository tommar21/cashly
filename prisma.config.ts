import dotenv from "dotenv";
import { defineConfig } from "prisma/config";
import path from "path";

// Load environment variables - try .env.local first, then .env
// Use silent option to avoid errors if files don't exist
dotenv.config({ path: path.resolve(process.cwd(), ".env.local") });
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
