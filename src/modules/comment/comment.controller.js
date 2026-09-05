import { Router } from "express";
import * as commentServices from "./services/comment.services.js";

const commentController = Router();

commentController.post("/", async (req, res) => {
  try {
    const comments = await commentServices.createBulkCommentsService(req.body);
    return res.status(201).json({ message: "comments created", comments });
  } catch (error) {
    return res.status(400).json({ message: error.message || "Failed to create comments" });
  }
});

commentController.patch("/:commentId", async (req, res) => {
  try {
    const comment = await commentServices.updateCommentService(req.params.commentId, req.body);
    return res.status(200).json({ message: "comment updated", comment });
  } catch (error) {
    return res.status(400).json({ message: error.message || "Failed to update comment" });
  }
});

commentController.post("/find-or-create", async (req, res) => {
  try {
    const comment = await commentServices.findOrCreateCommentService(req.body);
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(400).json({ message: error.message || "Failed to find or create comment" });
  }
});

commentController.get("/search", async (req, res) => {
  try {
    const result = await commentServices.searchCommentsByWordService(req.query.word);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({ message: error.message || "Failed to search comments" });
  }
});

commentController.get("/newest/:postId", async (req, res) => {
  try {
    const comments = await commentServices.getNewestCommentsService(req.params.postId);
    return res.status(200).json(comments);
  } catch (error) {
    return res.status(400).json({ message: error.message || "Failed to fetch newest comments" });
  }
});

commentController.get("/details/:id", async (req, res) => {
  try {
    const comment = await commentServices.getCommentDetailsService(req.params.id);
    return res.status(200).json(comment);
  } catch (error) {
    return res.status(400).json({ message: error.message || "Failed to fetch comment" });
  }
});

export default commentController;
