import React, { useState } from "react";
import api from "../api/api";

function CreateRecipe() {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        ingredients: [],
        steps: [],
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/recipes", formData);
            alert("Recipe created successfully");
        } catch (error) {
            alert("Error creating recipe");
        }
    };

    return (
        <form className="recipe-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                placeholder="Recipe Name"
                value={formData.name}
                onChange={handleChange}
            />
            <input
                type="text"
                name="category"
                placeholder="Category"
                value={formData.category}
                onChange={handleChange}
            />
            <textarea
                name="ingredients"
                placeholder="Ingredients (comma-separated)"
                value={formData.ingredients.join(", ")}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        ingredients: e.target.value.split(", "),
                    })
                }
            />
            <textarea
                name="steps"
                placeholder="Steps (newline-separated)"
                value={formData.steps.join("\n")}
                onChange={(e) =>
                    setFormData({
                        ...formData,
                        steps: e.target.value.split("\n"),
                    })
                }
            />
            <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={formData.image}
                onChange={handleChange}
            />
            <button type="submit">Create Recipe</button>
        </form>
    );
}

export default CreateRecipe;
