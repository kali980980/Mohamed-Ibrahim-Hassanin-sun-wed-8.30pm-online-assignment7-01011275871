import Post from "../../../DB/models/post.model.js";
import User from "../../../DB/models/user.model.js";
import Comment from "../../../DB/models/comment.model.js";

export const createPostService = async (data) => {
  const post = new Post(data);
  return await post.save();
};

export const deletePostService = async (postId, userId) => {
  const post = await Post.findByPk(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  if (post.userId !== Number(userId)) {
    throw new Error("Only the owner can delete this post");
  }

  await post.destroy();
  return { message: "Post deleted" };
};

export const getAllPostsWithDetailsService = async () => {
  return await Post.findAll({
    attributes: ["id", "title"],
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "name"],
      },
      {
        model: Comment,
        as: "comments",
        attributes: ["id", "content"],
      },
    ],
  });
};

export const getPostsWithCommentCountService = async () => {
  return await Post.findAll({
    attributes: {
      include: [[Comment.sequelize.literal("(SELECT COUNT(*) FROM comments WHERE comments.postId = post.id)"), "commentCount"]],
    },
    include: [{ model: Comment, attributes: [] }],
    group: ["post.id"],
  });
};
