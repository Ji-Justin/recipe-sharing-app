const Recipe = require('../models/recipeModel');

// Get all recipes
const getRecipes = async (req, res) => {
    const recipes = await Recipe.find().populate('createdBy', 'name');
    res.json(recipes);
};

// Get single recipe
const getRecipeById = async (req, res) => {
    const recipe = await Recipe.findById(req.params.id).populate('createdBy', 'name');
    if (recipe) {
        res.json(recipe);
    } else {
        res.state(404).json({ message: 'Recipe not found' });
    }
};

// Create recipe
const createRecipe = async (req, res) => {
    const { title, ingredients, instructions, imageUrl } = req.body;

    
}