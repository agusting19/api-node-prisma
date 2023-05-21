import express from "express";
import productRoutes from "./routes/products.routes.js";
import categoriesRoutes from "./routes/categories.routes.js";

const app = express();

app.use(express.json());

app.use("/api", productRoutes);
app.use("/api", categoriesRoutes);

app.listen(3000, () => {
  console.log("Server started on port 3000!");
});
