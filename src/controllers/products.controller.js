export const getProducts = async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
};

export const getProductById = async (req, res) => {
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
};

export const createProduct = async (req, res) => {
  const newProduct = await prisma.product.create({
    data: req.body,
  });

  return res.json(newProduct);
};

export const updateProduct = async (req, res) => {
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
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const productDeleted = await prisma.product.delete({
    where: {
      id: parseInt(id),
    },
  });

  if (!productDeleted)
    return res.status(404).json({ error: "Product not found" });

  return res.json(productDeleted);
};
