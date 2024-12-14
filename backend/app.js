const express = require("express");
const dotenv = require("dotenv");
const morgan = require('morgan');
const cors = require('cors');
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const recipeRoutes = require("./routes/recipeRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

module.exports = app;