const express = require("express");
const recipeRouter = require("./routes/recipeRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use("/api/recipes", recipeRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
