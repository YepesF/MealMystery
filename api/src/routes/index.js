import express from "express";
import recipeRoutes from "./recipeRoutes.js";
import fillDBRoutes from "./fillDBRoutes.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use("/recipes", authMiddleware, recipeRoutes);
router.use("/fillDB", fillDBRoutes);

export default router;
