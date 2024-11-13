const express = require("express");
const {
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
} = require("../controllers/recipeController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

router.route("/").get(getRecipes).post(protect, createRecipe);
router
    .route("/:id")
    .get(getRecipeById)
    .put(protect, updateRecipe)
    .delete(protect, deleteRecipe);

module.exports = router;
