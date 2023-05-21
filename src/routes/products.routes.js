import { Router } from "express";
import { prisma } from "../db.js";

const router = Router();

router.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

router.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const productFound = await prisma.product.findFirst({
    where: {
      id: parseInt(id),
    },
    include: {
      category: true,
    },
  });

  if (!productFound)
    return res.status(404).json({ error: "Product not found" });

  return res.json(productFound);
});

router.post("/products", async (req, res) => {
  const newProduct = await prisma.product.create({
    data: req.body,
  });

  return res.json(newProduct);
});

router.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const productUpdated = await prisma.product.update({
    where: {
      id: parseInt(id),
    },
    data: req.body,
  });

  if (!productUpdated)
    return res.status(404).json({ error: "Product not found" });

  return res.json(productUpdated);
});

router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const productDeleted = await prisma.product.delete({
    where: {
      id: parseInt(id),
    },
  });

  if (!productDeleted)
    return res.status(404).json({ error: "Product not found" });

  return res.json(productDeleted);
});

export default router;
