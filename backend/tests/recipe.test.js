require("./setupTestDB");
const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const Recipe = require("../models/Recipe");

describe("Recipe Routes", () => {
    let token;

    beforeAll(async () => {
        const user = await User.create({
            username: "testuser",
            email: "testuser@example.com",
            password: "password123",
        });

        const res = await request(app).post("/api/users/login").send({
            email: "testuser@example.com",
            password: "password123",
        });

        token = res.body.token;
    });

    it("should create a new recipe", async () => {
        const res = await request(app)
            .post("/api/recipes")
            .set("Authorization", `Bearer ${token}`)
            .send({
                title: "Test Recipe",
                description: "This is a test recipe",
                ingredients: ["Ingredient 1", "Ingredient 2"],
                instructions: ["Step 1", "Step 2"],
                imageUrl: "http://example.com/test-image.jpg",
            });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("title", "Test Recipe");
    });

    it("should fetch a recipe by ID", async () => {
        const recipe = await Recipe.create({
            title: "Test Recipe",
            description: "Description",
            ingredients: ["Ingredient 1", "Ingredient 2"],
            instructions: ["Step 1", "Step 2"],
        });

        const res = await request(app).get(`/api/recipes/${recipe._id}`);

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("title", "Test Recipe");
    });

    it("should return 404 for a non-existent recipe", async () => {
        const res = await request(app).get("/recipes/1234567890abcdef12345678");
        expect(res.statusCode).toBe(404);
    });
});
