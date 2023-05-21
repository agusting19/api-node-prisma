const getCategoriesFromDB = async () => {
  const categories = await prisma.category.findMany({
    include: {
      products: true,
    },
  });

  return categories;
};

export const getCategories = async (req, res) => {
  try {
    const categories = await getCategoriesFromDB();

    if (!categories) return res.status(404).json({ message: "Not found" });

    return res.status(200).json(categories);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
