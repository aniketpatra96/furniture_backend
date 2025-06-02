const express = require("express");
const {
  createOrder,
  getAllOrdersByUserId,
} = require("../controllers/orders.controller");
const OrderRouter = express.Router();

OrderRouter.get("/:id", getAllOrdersByUserId);
OrderRouter.post("/", createOrder);

module.exports = OrderRouter;
