import { useEffect, useState } from "react";
import api from "../api/api";
import RecipeCard from "../components/RecipeCard";

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipe = async () => {
            const { data } = await api.get("/recipes");
            setRecipes(data);
            setLoading(false);
        };

        fetchRecipe();
    }, []);

    if (loading) return <div>Loading...</div>

    return (
        <div>
            <h1>Recipes</h1>
            <div className="recipe-list">
                {recipes.map((recipe) => (
                    <RecipeCard key={recipe._id} recipe={recipe} />
                ))}
            </div>
        </div>
    )
};

export default HomePage;