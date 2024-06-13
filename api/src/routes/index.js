const express = require("express");
const router = express.Router();
const recipeRoutes = require("./recipeRoutes");
const fillDBRoutes = require("./fillDBRoutes");
const { testConnection } = require("../controllers/testConnectionController"); // Import the test connection controller

router.use("/recipes", recipeRoutes);
router.use("/fillDB", fillDBRoutes);
router.get("/test-connection", testConnection); // Add the test connection route

module.exports = router;
