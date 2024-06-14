const express = require("express");
const router = express.Router();
const recipeRoutes = require("./recipeRoutes");
const fillDBRoutes = require("./fillDBRoutes");

router.use("/recipes", recipeRoutes);
router.use("/fillDB", fillDBRoutes);

module.exports = router;
