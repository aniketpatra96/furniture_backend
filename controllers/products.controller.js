const ProductsModel = require("../models/products.model");

module.exports = {
  addAllProducts: async (req, res) => {
    try {
      await ProductsModel.insertMany(req.body);
      return res.status(201).json("All Products added successfully!");
    } catch (error) {
      return res.status(500).json("Failed to add all products due to " + error);
    }
  },
  createProduct: async (req, res) => {
    const newProduct = new ProductsModel(req.body);
    try {
      await newProduct.save();
      return res.status(201).json("Product created successfully!");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const products = await ProductsModel.find().sort({ createdAt: -1 });
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  getProduct: async (req, res) => {
    try {
      const product = await ProductsModel.findById(req.params.id);
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  searchProduct: async (req, res) => {
    try {
      const result = await ProductsModel.aggregate([
        {
          $search: {
            index: "furniture",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);      
      if (result.length === 0) {
        return res.status(404).json("No products found!");
      }
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json('Failed to get the products!' + error);
    }
  },
};


