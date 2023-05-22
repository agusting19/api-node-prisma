import { Router } from "express";
import {
  getProductsController,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/products.controller.js";
import {
  validateCreateProduct,
  validateUpdateProduct,
} from "../validators/products.validator.js";

const router = Router();

// TODO add middlewares (validation and error handling)
router.get("/products", getProductsController);
router.get("/products/:id", getProductByIdController);
router.post("/products", validateCreateProduct, createProductController);
router.put("/products/:id", validateUpdateProduct, updateProductController);
router.delete("/products/:id", deleteProductController);

export default router;
