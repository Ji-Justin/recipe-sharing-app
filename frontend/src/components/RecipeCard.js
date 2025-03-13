import React from 'react';
import { Link } from 'react-router-dom';

function RecipeCard({ recipe }) {
    return (
        <div className='recipe-card'>
            <img src={recipe.image} alt={recipe.name} />
            <h3>{recipe.name}</h3>
            <p>{recipe.category}</p>
            <Link to={`/recipe/${recipe._id}`}>View Details</Link>
        </div>
    );
}

export default RecipeCard;