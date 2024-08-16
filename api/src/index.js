import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors({
  origin: "*",
}));

// Middleware for parsing application/json
app.use(bodyParser.json());

app.use("/api/recipes", recipeRouter);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
