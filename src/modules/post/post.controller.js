import { Router } from "express";
import * as postServices from "./services/post.services.js";

const postController = Router();

postController.post("/", async (req, res) => {
  try {
    const post = await postServices.createPostService(req.body);
    return res.status(201).json({ message: "post created", post });
  } catch (error) {
    return res.status(400).json({ message: error.message || "Failed to create post" });
  }
});

postController.delete("/:postId", async (req, res) => {
  try {
    const result = await postServices.deletePostService(req.params.postId, req.body.userId);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message || "Failed to delete post" });
  }
});

postController.get("/details", async (req, res) => {
  try {
    const posts = await postServices.getAllPostsWithDetailsService();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(400).json({ message: error.message || "Failed to fetch posts" });
  }
});

postController.get("/comment-count", async (req, res) => {
  try {
    const posts = await postServices.getPostsWithCommentCountService();
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(400).json({ message: error.message || "Failed to fetch counts" });
  }
});

export default postController;
