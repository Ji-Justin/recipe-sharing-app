import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from "../api/api";

function RecipeDetail() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        const fetchRecipe = async () => {
            const { data } = await api.get(`/recipes/${id}`);
            setRecipe(data);
        };
        fetchRecipe();
    }, [id]);

    if (!recipe) return <p>Loading...</p>;

    return (
        <div className="recipe-detail">
            <h1>{recipe.name}</h1>
            <img src={recipe.image} alt={recipe.category} />
            <p><strong>Category:</strong> {recipe.category}</p>
            <p><strong>Ingredients:</strong></p>
            <ul>
                {recipe.ingredients.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                ))}
            </ul>
            <p><strong>Steps:</strong></p>
            <ol>
                {recipe.steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                ))}
            </ol>
        </div>
    );
}

export default RecipeDetail;