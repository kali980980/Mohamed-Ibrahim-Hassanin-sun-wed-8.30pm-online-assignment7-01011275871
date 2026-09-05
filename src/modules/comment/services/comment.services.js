import Comment from "../../../DB/models/comment.model.js";
import User from "../../../DB/models/user.model.js";
import Post from "../../../DB/models/post.model.js";
import { Op } from "sequelize";

export const createBulkCommentsService = async (comments) => {
  return await Comment.bulkCreate(comments);
};

export const updateCommentService = async (commentId, data) => {
  const comment = await Comment.findByPk(commentId);

  if (!comment) {
    throw new Error("Comment not found");
  }

  if (comment.userId !== Number(data.userId)) {
    throw new Error("Only the owner can update this comment");
  }

  comment.content = data.content;
  return await comment.save();
};

export const findOrCreateCommentService = async (data) => {
  const [comment, created] = await Comment.findOrCreate({
    where: {
      postId: data.postId,
      userId: data.userId,
      content: data.content,
    },
    defaults: data,
  });

  return { comment, created };
};

export const searchCommentsByWordService = async (word) => {
  const comments = await Comment.findAll({
    where: { content: { [Op.like]: `%${word}%` } },
  });

  return {
    matchedCount: comments.length,
    comments,
  };
};

export const getNewestCommentsService = async (postId) => {
  return await Comment.findAll({
    where: { postId },
    order: [["createdAt", "DESC"]],
    limit: 3,
  });
};

export const getCommentDetailsService = async (commentId) => {
  return await Comment.findByPk(commentId, {
    include: [
      { model: User, as: "user", attributes: ["id", "name"] },
      { model: Post, as: "post", attributes: ["id", "title"] },
    ],
  });
};
