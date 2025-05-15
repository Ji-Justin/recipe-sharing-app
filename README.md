# 🥗 Recipe Sharing App (MERN Stack)

A full-stack recipe sharing web application built with the MERN stack (MongoDB, Express, React, Node.js). Users can register, login, create and manage their own recipes, and browse recipes shared by others.

## 🚀 Features

- 🧾 User registration and login with JWT authentication
- 📚 View all recipes and recipe details
- ✍️ Create, edit, and delete recipes (authenticated users only)
- 🔍 Search recipes by name
- 👤 Profile management (update username and email)
- 🧪 Backend and frontend testing with Jest and React Testing Library

---

## 🛠️ Tech Stack

**Frontend:**
- React
- Axios
- React Router DOM
- Tailwind CSS (optional for styling)

**Backend:**
- Node.js
- Express
- MongoDB + Mongoose
- JWT for authentication
- bcrypt for password hashing

**Testing:**
- Jest
- Supertest

---

## ✨ API Endpoints

### Auth

-   `POST /api/users/register` – Register new user
    
-   `POST /api/users/login` – Login and get JWT
    
-   `GET /api/users/profile` – Get logged-in user's profile
    
-   `PUT /api/users/profile` – Update profile
    

### Recipes

-   `GET /api/recipes` – Get all recipes
    
-   `GET /api/recipes/:id` – Get single recipe
    
-   `POST /api/recipes` – Create a recipe
    
-   `PUT /api/recipes/:id` – Update recipe
    
-   `DELETE /api/recipes/:id` – Delete recipe
    

----------

## 📸 Screenshots

Work in Progress