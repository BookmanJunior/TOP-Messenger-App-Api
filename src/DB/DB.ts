import pg, { QueryResultBase } from "pg";
const { Pool } = pg;

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: (process.env.DB_PORT && parseInt(process.env.DB_PORT)) || 5432,
  database: process.env.DB,
});

interface QueryResult<T> extends QueryResultBase {
  rows: T[];
}

export default async function dbquery<T>(
  query: string,
  params?: (string | number)[]
): Promise<QueryResult<T>> {
  const res = await pool.query(query, params);
  return res;
}

export const getClient = () => {
  return pool.connect();
};
