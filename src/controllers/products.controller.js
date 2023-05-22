import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../services/products.service.js";

export const getProductsController = async (req, res) => {
  try {
    const products = await getAllProducts();

    if (!products.length)
      return res.status(404).json({ error: "No products found" });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getProductByIdController = async (req, res) => {
  try {
    const productFound = await getProductById(req.params.id);

    if (!productFound)
      return res.status(404).json({ error: "Product not found" });

    return res.json(productFound);
  } catch (error) {
    if (error.message === "Invalid product ID") {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createProductController = async (req, res) => {
  try {
    const newProduct = await createProduct(req.body);

    return res.status(201).json(newProduct);
  } catch (error) {
    if (error.message === "Missing required fields") {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const productUpdated = await updateProduct(req.params.id, req.body);

    if (!productUpdated)
      return res.status(404).json({ error: "Product not found" });

    return res.status(201).json(productUpdated);
  } catch (error) {
    if (error.message === "Invalid product ID") {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    const productDeleted = await deleteProduct(req.params.id);

    if (!productDeleted)
      return res.status(404).json({ error: "Product not found" });

    return res.json(productDeleted);
  } catch (error) {
    return res.status(500).json({ error: "Error deleting product" });
  }
};
