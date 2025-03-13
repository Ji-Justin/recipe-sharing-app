const Recipe = require("../models/Recipe");

// Create recipe
const createRecipe = async (req, res) => {
    const { title, description, ingredients, instructions, imageUrl } = req.body;
    const recipe = new Recipe({
        title,
        description,
        ingredients,
        instructions,
        imageUrl,
        category,
        author: req.user._id,
    });

    await recipe.save();
    res.status(201).json(recipe);
};

// Get all recipes
const getRecipes = async (req, res) => {
    const recipes = await Recipe.find().populate("author", "name");
    res.json(recipes);
};

// Get single recipe
const getRecipeById = async (req, res) => {
    const recipe = await Recipe.findById(req.params.id)
        .populate("author", "username")
        .populate({
            path: "comments",
            populate: { path: "author", select: "username" },
        });
    if (recipe) {
        res.json(recipe);
    } else {
        res.state(404).json({ message: "Recipe not found" });
    }
};

// Update recipe
const updateRecipe = async (req, res) => {
    const { title, description, ingredients, instructions, imageUrl } = req.body;
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
        if (recipe.createdBy.toString() === req.user._id.toString()) {
            recipe.title = title;
            recipe.description = description;
            recipe.ingredients = ingredients;
            recipe.instructions = instructions;
            recipe.imageUrl = imageUrl || recipe.imageUrl;
            recipe.category = category || recipe.category;

            await recipe.save();
            res.json(recipe);
        } else {
            res.status(401).json({ message: "Not authorized" });
        }
    } else {
        res.status(404).json({ message: "Recipe not found" });
    }
};

// Delete recipe
const deleteRecipe = async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);

    if (recipe && recipe.createdBy.toString() === req.user._id.toString()) {
        await recipe.remove();
        res.json({ message: "Recipe removed" });
    } else {
        res.status(404).json({ message: "Recipe not found" });
    }
};

module.exports = {
    createRecipe,
    getRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe,
};
