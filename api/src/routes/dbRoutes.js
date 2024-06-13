// src/routes/index.js
const express = require("express");
const db = require("../database");

const router = express.Router();

// Ruta de prueba de conexión
router.get("/test-connection", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res
      .status(200)
      .json({
        message: "Database connection successful",
        timestamp: result.rows[0].now,
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection failed" });
  }
});

router.get("/recipes", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM recipes");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
