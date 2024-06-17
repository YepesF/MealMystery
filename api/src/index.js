import express from "express";
import bodyParser from "body-parser";
import router from "./routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing application/json
app.use(bodyParser.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
