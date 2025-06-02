const OrderModel = require("../models/order.model");

module.exports = {
  createOrder: async (req, res) => {
    try {
      const order = await OrderModel.create({
        userId: req.body.userId,
        recipientName: req.body.recipientName,
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        paymentMethod: req.body.paymentMethod,
        products: req.body.products,
        totalPrice: req.body.totalPrice,
      });
      return res.status(201).json(order);
    } catch (error) {
      return res.status(500).json("Server Error");
    }
  },
  getAllOrdersByUserId: async (req, res) => {
    try {
      const orders = await OrderModel.find({ userId: req.params.id });
      return res.status(200).json(orders);
    } catch (error) {
      return res.status(500).json("Server Error");
    }
  },
  getOrderById: async (req, res) => {
    try {
      const order = await OrderModel.findById(req.params.id).populate("userId");
      if (!order) {
        return res.status(404).json("Order not found");
      }
      return res.status(200).json(order);
    } catch (error) {
      return res.status(500).json("Server Error");
    }
  },
};
