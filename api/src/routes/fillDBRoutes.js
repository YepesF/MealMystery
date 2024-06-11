const express = require("express");
const router = express.Router();
const { fillRecipes } = require("../controllers/fillDBController");

router.patch("/", fillRecipes);

module.exports = router;
