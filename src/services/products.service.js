import { prisma } from "../db.js";

const validateId = (id) => {
  const parsedId = Number(id);
  if (!Number.isInteger(parsedId)) {
    throw new Error("Invalid product ID");
  }

  return parsedId;
};

export const getAllProducts = async () => {
  return await prisma.product.findMany();
};

export const getProductById = async (id) => {
  const validId = validateId(id);

  return await prisma.product.findFirst({
    where: {
      id: validId,
    },
    include: {
      category: true,
    },
  });
};

export const createProduct = async (data) => {
  const { name, price, categoryId, stock } = data;
  if (!name || !price || !categoryId || !stock) {
    throw new Error("Missing required fields");
  }

  const validId = validateId(categoryId);

  const newProduct = await prisma.product.create({
    data,
  });

  return newProduct;
};

export const updateProduct = async (id, data) => {
  const validId = validateId(id);

  return await prisma.product.update({
    where: {
      id: validId,
    },
    data: data,
  });
};

export const deleteProduct = async (id) => {
  const validId = validateId(id);

  return prisma.product.delete({
    where: {
      id: validId,
    },
  });
};
