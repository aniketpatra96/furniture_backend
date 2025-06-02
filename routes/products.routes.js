const express = require("express");
const {
  addAllProducts,
  getAllProducts,
  createProduct,
  getProduct,
  searchProduct,
  // sortProductsByPrice,
  // sortProductsByName,
} = require("../controllers/products.controller");
const ProductsRouter = express.Router();
ProductsRouter.post("/addall", addAllProducts);
ProductsRouter.post("/", createProduct);
ProductsRouter.get("/:id", getProduct);
ProductsRouter.get("/", getAllProducts);
ProductsRouter.get("/search/:key", searchProduct);
// ProductsRouter.get("/sort/price", sortProductsByPrice); // Route to sort by price
// ProductsRouter.get("/sort/name", sortProductsByName);  
module.exports = ProductsRouter;
