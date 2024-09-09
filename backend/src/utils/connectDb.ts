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

export async function insertBlog(
  connector: mysql.Pool,
  data: { user_name: string; title: string; content: string }
): Promise<void> {
  try {
    // Check if the user exists
    const checkUserQuery = `SELECT COUNT(*) as count FROM users WHERE user_name = ?`;
    const [countResult] = await connector.execute(checkUserQuery, [
      data.user_name,
    ]);

    let user_id: number;

    if (countResult[0].count > 0) {
      const getUserQuery = `SELECT user_id FROM users WHERE user_name = ?`;
      const [rows] = await connector.execute(getUserQuery, [data.user_name]);
      user_id = rows[0].user_id;
    } else {
      // Insert the user if not exists
      const insertUserQuery = `INSERT INTO users(user_name) VALUES (?)`;
      await connector.execute(insertUserQuery, [data.user_name]);

      const getUserQuery = `SELECT user_id FROM users WHERE user_name = ?`;
      const [rows] = await connector.execute(getUserQuery, [data.user_name]);
      user_id = rows[0].user_id;
    }

    if (!user_id) {
      throw new Error("User ID not found");
    }
    const blogQuery = `INSERT INTO blogs(user_id, title, content) VALUES (?, ?, ?)`;
    await connector.execute(blogQuery, [user_id, data.title, data.content]);
  } catch (error) {
    console.error("Error inserting blog:", error);
    throw error;
  }
}
