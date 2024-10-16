const Recipe = require("../models/Recipe");

// Get all recipes
const getRecipes = async (req, res) => {
    const recipes = await Recipe.find().populate("createdBy", "name");
    res.json(recipes);
};

// Get single recipe
const getRecipeById = async (req, res) => {
    const recipe = await Recipe.findById(req.params.id).populate(
        "createdBy",
        "name"
    );
    if (recipe) {
        res.json(recipe);
    } else {
        res.state(404).json({ message: "Recipe not found" });
    }
};

// Create recipe
const createRecipe = async (req, res) => {
    const { title, ingredients, instructions, imageUrl } = req.body;
    const recipe = new Recipe({
        title,
        ingredients,
        instructions,
        imageUrl,
        createdBy: req.user._id,
    });

    const createdRecipe = await recipe.save();
    res.status(201).json(createdRecipe);
};

// Update recipe
const updateRecipe = async (req, res) => {
    const { title, ingredients, instructions, imageUrl } = req.body;
    const recipe = await Recipe.findById(req.params.id);
    if (recipe) {
        if (recipe.createdBy.toString() === req.user._id.toString()) {
            recipe.title = title;
            recipe.ingredients = ingredients;
            recipe.instructions = instructions;
            recipe.imageUrl = imageUrl || recipe.imageUrl;

            const updatedRecipe = await recipe.save();
            res.json(updatedRecipe);
        } else {
            res.status(401).json({ message: "Not authorized" });
        }
    } else {
        res.status(404).json({ message: "Recipe not found" });
    }
};

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
    getRecipes,
    getRecipeById,
    createRecipe,
    updateRecipe,
    deleteRecipe,
};
