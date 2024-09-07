require("dotenv/config");
import mysql, { PoolOptions, Pool } from "mysql2/promise";
// promise is wrapped into PoolOptions
export async function createConnection(): Promise<Pool> {
  const access: PoolOptions = {
    user: process.env.DB_USER,
    host: process.env.HOST,
    port: Number(process.env.DB_PORT),
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 2,
    maxIdle: 2, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 30000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
  };

  // Creating a promise-based pool
  const conn = await mysql.createPool(access);
  return conn;
}

// Function to get blogs
export async function getBlogs(
  connector: mysql.Pool
): Promise<mysql.QueryResult> {
  const query = "SELECT * FROM blogs";
  const [rows] = await connector.execute(query);
  // console.log(rows);
  return rows;
}

export async function insertBlog(connector: mysql.Pool, data): Promise<void> {
  //question marks are safety of inserting strings
  const query = `INSERT INTO blogs(user_id, title, content) VALUES (?, ?, ?)`;
  //should use execute instead of query
  await connector.execute(query, [data.user_id, data.title, data.content]);
}
