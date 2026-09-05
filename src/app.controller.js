import express from "express";
import { dbconnection } from "./DB/connection.js";
import "./DB/models/user.model.js";
import "./DB/models/note.model.js";
import "./DB/models/post.model.js";
import "./DB/models/comment.model.js";
import userController from "./modules/user/user.controller.js";
import noteController from "./modules/note/note.controller.js";
import postController from "./modules/post/post.controller.js";
import commentController from "./modules/comment/comment.controller.js";

export default async () => {
  const app = express();
  const port = 3000;

  app.use(express.json());
  await dbconnection();

  app.use("/users", userController);
  app.use("/notes", noteController);
  app.use("/posts", postController);
  app.use("/comments", commentController);

  app.use((req, res, next) => {
    res.status(404).json({
      message: "Router not found ",
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      stack: err.stack,
      message: "something wrong",
    });
  });

  app.listen(port, () => {
    console.log(`server is running at port :::: ${port}`);
  });
};

