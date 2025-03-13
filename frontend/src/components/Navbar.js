import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <header>
            <nav>
                <h1><Link to="/">RecipeBook</Link></h1>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/create">Create Recipe</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><button onClick={logoutHandler}>Logout</button></li>
                </ul>
            </nav>
        </header>
    );
};

export default Navbar;