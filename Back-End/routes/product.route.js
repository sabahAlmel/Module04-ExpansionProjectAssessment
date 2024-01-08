import express from "express";

import {
  createProd,
  getAllProds,
  removeProd,
  editProd,
} from "../controllers/product.controller.js";

const productRouter = express.Router();

productRouter.post("/add", createProd);
productRouter.get("/read", getAllProds);
productRouter.patch("/update", editProd);
productRouter.delete("/delete", removeProd);

export default productRouter;
