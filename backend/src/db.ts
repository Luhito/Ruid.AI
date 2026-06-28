import { Pool } from "pg";

const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "mydb",
  user: "myuser",
  password: "mypassword",
});

export default pool;