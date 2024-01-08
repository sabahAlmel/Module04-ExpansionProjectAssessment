import express from "express";

import { addCategory } from "../controllers/category.controller.js";

const categoriesRouter = express.Router();

categoriesRouter.post("/add", addCategory);

export default categoriesRouter;
