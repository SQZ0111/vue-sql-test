const express = require("express");
const cors = require("cors");
import { getBlogs, insertBlog, createConnection } from "./utils/connectDb";

const app = express();
const port = 3003;

app.use(cors());

//attach connectionPool
let connectionPool;
app.use(async (req, res, next) => {
  if (!connectionPool) {
    connectionPool = await createConnection();
  }
  req.db = connectionPool;
  next();
});

app.get("/", (req, res) => {
  res.send("Hallo Welt!");
});

// Use the connection pool from `req` in your routes
app.get("/blogs", async (req, res) => {
  try {
    const data = await getBlogs(req.db);
    res.send(data);
  } catch (err) {
    res.status(500).send("Error fetching blogs");
  }
});

app.post("/blogs/insert", async (req, res) => {
  //this is dummy test data
  const data = {
    user_id: 1,
    title: "Some another Test",
    content: "Some dumb content without any sense",
  };
  try {
    await insertBlog(req.db, data);
    res.send("Blog inserted successfully");
  } catch (err) {
    res.status(500).send("Error inserting blog");
  }
});

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
