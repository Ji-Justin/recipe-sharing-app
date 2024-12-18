const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/:recipeId", protect, commentController.addComment);
router.delete("/:id", protect, commentController.deleteComment);

module.exports = router;
