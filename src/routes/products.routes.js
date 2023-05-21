import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/products", getProducts);

router.get("/products/:id", getProductById);

router.post("/products", createProduct);

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);

export default router;
