const db = require("../database");

const testConnection = async (req, res) => {
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
};

module.exports = {
  testConnection,
};
