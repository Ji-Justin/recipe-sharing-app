import { Link, useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    const logoutHandler = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/profile">Profile</Link>
                <button onClick={logoutHandler}>Logout</button>
            </nav>
        </header>
    );
};

export default Header;