import express from "express";
import recipeRoutes from "./recipeRoutes.js";
import fillDBRoutes from "./fillDBRoutes.js";

const router = express.Router();

router.use("/recipes", recipeRoutes);
router.use("/fillDB", fillDBRoutes);

export default router;
