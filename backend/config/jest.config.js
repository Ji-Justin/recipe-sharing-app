module.exports = {
    testEnvironment: "node",
    setupFilesAfterEnv: ["./tests/setupTestDB.js"],
    fakeTimers: {
        enableGlobally: false,
    },
};
