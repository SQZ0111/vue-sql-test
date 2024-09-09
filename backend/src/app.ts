const express = require("express");
const cors = require("cors");
import { timeLog } from "console";
import { getBlogs, insertBlog, createConnection } from "./utils/connectDb";
import { Recoverable } from "repl";
import { validateBlog } from "./utils/validateSanitize";

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
app.get("/blogs", express.json(), async (req, res) => {
  try {
    const data = await getBlogs(req.db);
    res.send(data);
  } catch (err) {
    res.status(500).send("Error fetching blogs");
  }
});

app.post("/blogs/create", express.json(), async (req, res) => {
  //this is dummy test data
  // const data = {
  //   user_id: 1,
  //   title: "Some another Test",
  //   content: "Some dumb content without any sense",
  // };
  const { user_name, title, content } = req.body as Record<string, string>;
  const data = {
    user_name: user_name,
    title: title,
    content: content,
  };
  try {
    const validateStatus = validateBlog(data);
    if (validateStatus != "ok")
      res.status(400).send({ message: validateStatus });
    await insertBlog(req.db, data);
    res.send({ message: "Blog inserted successfully" });
  } catch (err) {
    console.error("Error inserting blog:", err);
    res.status(500).send({ message: "Error inserting blog" });
  }
});

app.listen(port, () => {
  console.log(`Listening on Port ${port}`);
});
