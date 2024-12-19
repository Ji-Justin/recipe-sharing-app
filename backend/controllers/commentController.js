const Comment = require("../models/Comment");
const Recipe = require("../models/Recipe");

// Add a comment
const addComment = async (req, res) => {
    const { content } = req.body;
    const recipeId = req.params.recipeId;

    const newComment = new Comment({
        content,
        author: req.user.userId,
        recipe: recipeId,
    });
    await newComment.save();

    await Recipe.findByIdAndUpdate(recipeId, {
        $push: { comments: newComment._id },
    });

    res.status(201).json(newComment);
};

// Delete comment
const deleteComment = async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if (!comment)
        return res.status(404).jason({ message: "Comment not found" });

    if (comment.author.toString() !== req.user.userId)
        return res.status(403).json({ message: "Unauthorized" });

    await comment.remove();
    await Recipe.findByIdAndUpdate(comment.recipe, {
        $pull: { comments: comment._id },
    });

    res.json({ message: "Comment deleted" });
};

module.exports = {
    addComment,
    deleteComment,
};
