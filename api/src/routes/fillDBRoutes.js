import express from "express";
import { fillRecipes } from "../controllers/fillDBController.js";

const router = express.Router();

router.patch("/", fillRecipes);

export default router;
