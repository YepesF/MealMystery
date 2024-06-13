const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const router = require("./routes/index");

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`API is listening on port ${PORT}`);
});
