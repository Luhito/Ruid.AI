import { Pool } from "pg";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const currentDir = dirname(fileURLToPath(import.meta.url));
const envFileCandidates = [
  resolve(process.cwd(), ".env"),
  resolve(currentDir, ".env"),
  resolve(currentDir, "../../.env"),
];

for (const envFile of envFileCandidates) {
  if (existsSync(envFile)) {
    process.loadEnvFile(envFile);
  }
}

const requiredEnvNames = ["DB_NAME", "DB_USER", "DB_PASSWORD"] as const;
for (const envName of requiredEnvNames) {
  if (!process.env[envName]) {
    throw new Error(`${envName} is not set`);
  }
}

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export default pool;
