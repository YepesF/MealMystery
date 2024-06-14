const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
const router = require("./routes/index");

// Middleware for parsing application/json
app.use(bodyParser.json());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
