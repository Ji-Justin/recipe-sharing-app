import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const { data } = await api.get("/users/profile");
                setUser(data);
            } catch (err) {
                navigate("/login");
            } finally {
                setLoading(false);
            }
        };
    }, [navigate]);

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h2>{user.username}</h2>
            <p>Email: {user.email}</p>
            <h3>Your Recipes</h3>
            <ul>
                {user.recipes.map((recipe) => (
                    <li key={recipe._id}>{recipe.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProfilePage;