const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "5m" });
};

const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Register new user
const registerUser = async (req, res) => {
    const { username, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: "Email already in use." });
    }

    // Check if any param is empty
    if (!username || !email || !password) {
        let message = "";
        if (!username) {
            message = "Username is empty";
        } else if (!email) {
            message = "Email is empty";
        } else {
            message = "Password is empty";
        }
        return res.status(400).json({ message: message });
    }

    // Check valid email
    if (!validateEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" });
    }

    // Create new user
    const newUser = await User.create({
        username,
        email,
        password,
    });

    if (newUser) {
        res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            token: generateToken(newUser._id),
        });
    } else {
        res.status(400).json({ message: "Invalid user data" });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check password
    if (user && (await user.comparePassword(password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        res.status(401).json({ message: "Invalid email or password" });
    }
};

module.exports = { registerUser, loginUser };
