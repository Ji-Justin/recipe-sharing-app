require("./setupTestDB");
const request = require("supertest");
const app = require("../app");
const User = require("../models/User");

describe("User Routes", () => {
    it("registers a new user", async () => {
        const res = await request(app).post("/api/users/register").send({
            username: "testuser",
            email: "testuser@example.com",
            password: "password123",
        });
        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty("username", "testuser");
        expect(res.body).toHaveProperty("email", "testuser@example.com");
    });

    it("should not register a user with same email", async () => {
        await User.create({
            username: "testuser",
            email: "testuser@example.com",
            password: "password123",
        });

        const res = await request(app).post("/api/users/register").send({
            username: "testuser2",
            email: "testuser@example.com",
            password: "password123",
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe("Email already in use.");
    });

    it("login a user and return a token", async () => {
        const user = await User.create({
            username: "testuser",
            email: "testuser@example.com",
            password: "password123",
        });

        const res = await request(app).post("/api/users/login").send({
            email: "testuser@example.com",
            password: "password123",
        });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
    });
});
